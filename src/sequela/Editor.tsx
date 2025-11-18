// src/sequela/Editor.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import type { Core, EventObjectNode } from "cytoscape";

import type { GraphData, LayoutData } from "./types";
import { clamp, pxToRel, relToPx, mergeCoreAndLayout } from "./utils";
import { makeStyles } from "./cyStyles";
import { restoreViewport, saveViewport } from "./viewport";

type Props = {
    data: GraphData;
    aspectRatio?: number;
    /** Optional hook – if you later want to persist on the server. */
    onSave?: (layout: LayoutData) => Promise<void> | void;
};

const HANDLE_R = 8; // px

export default function Editor({ data, aspectRatio = 1, onSave }: Props) {
    // ---- state ---------------------------------------------------------------
    const [layout, setLayout] = useState<LayoutData>(() => data.layout ?? {});
    const [editing, setEditing] = useState<boolean>(false);
    const cyRef = useRef<Core | null>(null);
    const svgRef = useRef<SVGGElement | null>(null);

    // merged graph (core data + current layout)
    const g = useMemo(() => mergeCoreAndLayout({ ...data, layout }), [data, layout]);

    // viewport size inside the white canvas
    const innerW = 920;
    const innerH = Math.round(innerW / aspectRatio);

    // ---- hotkeys -------------------------------------------------------------
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.ctrlKey && (e.key === "e" || e.key === "E")) {
                e.preventDefault();
                setEditing((v) => !v);
            }
            if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
                e.preventDefault();
                doSave();
            }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layout]);

    // ---- cytoscape setup -----------------------------------------------------
    function onCyReady(cy: Core): void {
        cyRef.current = cy;
        cy.styles(makeStyles());
        cy.autoungrabify(!editing); // nodes draggable only in edit mode

        // update layout on node drag (edit mode)
        cy.on("dragfree", "node", (evt: EventObjectNode) => {
            if (!editing) return;
            const n = evt.target;
            const id = String(n.id());
            const pos = n.position();
            setLayout((prev) => {
                const next: LayoutData = { ...prev, nodes: prev.nodes ? [...prev.nodes] : [] };
                const x_rel = pxToRel(pos.x, innerW);
                const y_rel = pxToRel(pos.y, innerH);
                const idx = next.nodes?.findIndex((x) => x.id === id) ?? -1;
                if (idx >= 0 && next.nodes) next.nodes[idx] = { ...next.nodes[idx], id, x_rel, y_rel };
                else next.nodes?.push({ id, x_rel, y_rel });
                return next;
            });
        });

        // click -> open pages (view mode only)
        cy.on("tap", "node", (evt) => {
            if (editing) return;
            const id = String(evt.target.id());
            const url: string | undefined = evt.target.data("url");
            window.location.href = url || `/diseases/${encodeURIComponent(id)}`;
        });
        cy.on("tap", "edge", (evt) => {
            if (editing) return;
            const id = String(evt.target.id());
            const url: string | undefined = evt.target.data("url");
            window.location.href = url || `/evseq/${encodeURIComponent(id)}`;
        });

        // keep/restore viewport per-session
        restoreViewport(cy);
        cy.on("pan zoom", () => saveViewport(cy));
    }

    // keep cy drag enabled/disabled when mode changes
    useEffect(() => {
        const cy = cyRef.current;
        if (!cy) return;
        cy.autoungrabify(!editing);
    }, [editing]);

    // ---- circle drag/resize (SVG overlay) ------------------------------------
    type DragState =
        | null
        | { kind: "move"; id: string; startX: number; startY: number; cx0: number; cy0: number }
        | { kind: "resize"; id: string; startX: number; startY: number; r0: number };

    const dragRef = useRef<DragState>(null);

    function circleDown(id: string, cx: number, cy: number) {
        return (e: React.PointerEvent<SVGCircleElement>) => {
            if (!editing) return;
            (e.currentTarget as Element).setPointerCapture(e.pointerId);
            dragRef.current = { kind: "move", id, startX: e.clientX, startY: e.clientY, cx0: cx, cy0: cy };
        };
    }
    function handleDown(id: string, r: number) {
        return (e: React.PointerEvent<SVGCircleElement>) => {
            if (!editing) return;
            (e.currentTarget as Element).setPointerCapture(e.pointerId);
            dragRef.current = { kind: "resize", id, startX: e.clientX, startY: e.clientY, r0: r };
        };
    }
    function onPointerMove(e: React.PointerEvent<SVGGElement>) {
        if (!editing || !dragRef.current) return;
        const st = dragRef.current;
        if (st.kind === "move") {
            const dx = e.clientX - st.startX;
            const dy = e.clientY - st.startY;
            const cx = clamp(st.cx0 + dx, 0, innerW);
            const cy = clamp(st.cy0 + dy, 0, innerH);
            setLayout((prev) => ({
                ...prev,
                circles: updateCircle(prev.circles, st.id, {
                    cx_rel: pxToRel(cx, innerW),
                    cy_rel: pxToRel(cy, innerH),
                }),
            }));
        } else {
            const dy = e.clientY - st.startY;
            const r = clamp(st.r0 + dy, 6, Math.min(innerW, innerH));
            setLayout((prev) => ({
                ...prev,
                circles: updateCircle(prev.circles, st.id, {
                    r_rel: pxToRel(r, Math.min(innerW, innerH)),
                }),
            }));
        }
    }
    function onPointerUp() {
        dragRef.current = null;
    }

    // helper to upsert circle layout
    function updateCircle(
        arr: LayoutData["circles"],
        id: string,
        patch: Partial<NonNullable<LayoutData["circles"]>[number]>
    ): NonNullable<LayoutData["circles"]> {
        const next = arr ? [...arr] : [];
        const i = next.findIndex((c) => c.id === id);
        if (i >= 0) next[i] = { ...next[i], id, ...patch };
        else next.push({ id, ...patch });
        return next;
    }

    // ---- save ----------------------------------------------------------------
    async function doSave() {
        const file = "manual.layout.json";
        const blob = new Blob([JSON.stringify(layout, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file;
        a.click();
        URL.revokeObjectURL(a.href);
        if (onSave) await onSave(layout);
    }

    // ---- render --------------------------------------------------------------
    const elements = useMemo(() => {
        // nodes
        const n = g.nodes.map((nd) => ({
            data: {
                id: nd.id,
                label: nd.label,
                color: (nd as any).color,
                url: (nd as any).url,
            },
            position: {
                x: relToPx(nd.x_rel, innerW),
                y: relToPx(nd.y_rel, innerH),
            },
        }));
        // edges
        const e = g.edges.map((ed) => ({
            data: {
                id: ed.id,
                source: ed.source,
                target: ed.target,
                relation: ed.relation,
                color: (ed as any).color,
                url: (ed as any).url,
            },
        }));
        return [...n, ...e];
    }, [g, innerW, innerH]);

    return (
        <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 8, display: "flex", gap: 12, alignItems: "center" }}>
                <button onClick={() => setEditing((v) => !v)}>{editing ? "Stop editing (Ctrl-E)" : "Edit (Ctrl-E)"}</button>
                <button onClick={doSave} disabled={!editing}>
                    Save layout (Ctrl-S)
                </button>
                <span style={{ opacity: 0.6 }}>
          {editing
              ? "Drag nodes. Drag circle or its small handle to resize."
              : "Pan/zoom; click nodes/edges to open pages."}
        </span>
            </div>

            <div
                style={{
                    width: innerW + 40,
                    margin: "0 auto",
                    background: "var(--panel, #ecf3f6)",
                    padding: 20,
                    borderRadius: 10,
                }}
            >
                {/* Canvas */}
                <div style={{ position: "relative", width: innerW, height: innerH, background: "white", borderRadius: 8 }}>
                    {/* Cytoscape layer */}
                    <CytoscapeComponent
                        cy={onCyReady}
                        elements={elements as any}
                        style={{ position: "absolute", inset: 0 }}
                        stylesheet={makeStyles()}
                        userZoomingEnabled={true}
                        userPanningEnabled={true}
                        boxSelectionEnabled={false}
                        autounselectify={true}
                    />

                    {/* Circles SVG overlay */}
                    <svg viewBox={`0 0 ${innerW} ${innerH}`} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                        <g
                            ref={svgRef}
                            style={{ pointerEvents: "auto" }}
                            onPointerMove={onPointerMove}
                            onPointerUp={onPointerUp}
                            onPointerCancel={onPointerUp}
                        >
                            {g.circles.map((c) => {
                                const cx = relToPx(c.cx_rel, innerW);
                                const cy = relToPx(c.cy_rel, innerH);
                                const r = relToPx(c.r_rel, Math.min(innerW, innerH));

                                return (
                                    <g key={c.id}>
                                        {/* circle body */}
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r={r}
                                            fill={(c as any).color || "#a0c7ff"}
                                            opacity={0.18}
                                            stroke={(c as any).color || "#9bb3d6"}
                                            strokeWidth={1}
                                            onPointerDown={circleDown(c.id, cx, cy)}
                                            style={{ cursor: editing ? "move" : "default" }}
                                        />
                                        {/* italic label */}
                                        <text
                                            x={cx}
                                            y={cy - r + 16}
                                            textAnchor="middle"
                                            style={{ fontSize: 12, fontStyle: "italic", fill: "#2d3a40", pointerEvents: "none" }}
                                        >
                                            {c.label}
                                        </text>
                                        {/* resize handle */}
                                        {editing && (
                                            <circle
                                                cx={cx + r * 0.7}
                                                cy={cy + r * 0.7}
                                                r={HANDLE_R}
                                                fill="#4b8790"
                                                opacity={0.9}
                                                onPointerDown={handleDown(c.id, r)}
                                                style={{ cursor: "nwse-resize" }}
                                            />
                                        )}
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}
