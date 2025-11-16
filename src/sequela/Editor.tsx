import { useEffect, useMemo, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import type { Core, EventObjectNode } from "cytoscape";
import type { GraphData } from "./types";
import { clamp, hashGraphShape, pxToRel, relToPx } from "./utils";
import { makeStyles } from "./cyStyles";
import { restoreViewport, saveViewport } from "./viewport";

type SaveHook = (g: GraphData) => Promise<void> | void;
type Tool = "nodes" | "circles";

const PATCH_KEY = "viz:v2:patch";
const VERSION_KEY = "viz:v2:version";

function downloadJson(name: string, data: unknown) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
}

export default function Editor({
                                   data,
                                   aspectRatio = 1,
                                   postSave,
                               }: {
    data: GraphData;
    aspectRatio?: number;
    postSave?: SaveHook;
}) {
    const pad = 16;
    const width = 980;
    const height = Math.round(width / aspectRatio);
    const innerW = width - pad * 2;
    const innerH = height - pad * 2;

    const [g, setG] = useState<GraphData>(() => JSON.parse(JSON.stringify(data)));
    const [tool, setTool] = useState<Tool>("nodes"); // NEW: Nodes first, so dragging works immediately
    const cyRef = useRef<Core | null>(null);
    const gRef = useRef<SVGGElement | null>(null);

    // Reapply unsaved patch if shape matches
    useEffect(() => {
        const version = hashGraphShape({
            circles: data.circles.map((c) => c.id),
            nodes: data.nodes.map((n) => n.id),
            edges: data.edges.length,
        });
        const storedVer = sessionStorage.getItem(VERSION_KEY);
        const patch = sessionStorage.getItem(PATCH_KEY);
        if (patch && storedVer === version) {
            try {
                setG((prev) => mergePatch(prev, JSON.parse(patch)));
            } catch {
                /* ignore malformed patches */
            }
        }
        sessionStorage.setItem(VERSION_KEY, version);
    }, [data]);

    // Persist live patch
    useEffect(() => {
        const patch: Partial<GraphData> = {
            circles: g.circles.map(({ id, cx_rel, cy_rel, r_rel, color, label }) => ({
                id,
                cx_rel,
                cy_rel,
                r_rel,
                color,
                label,
            })),
            nodes: g.nodes.map(({ id, x_rel, y_rel, label, classIds }) => ({
                id,
                x_rel,
                y_rel,
                label,
                classIds,
            })),
        };
        sessionStorage.setItem(PATCH_KEY, JSON.stringify(patch));
    }, [g]);

    const stylesheet = useMemo(() => makeStyles(g), [g]);

    async function save() {
        downloadJson("graph.json", g);
        if (postSave) await Promise.resolve(postSave(g));
        sessionStorage.removeItem(PATCH_KEY);
    }

    // Hotkeys: Ctrl+S (save), N (nodes tool), C (circles tool)
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if ((e.ctrlKey || e.metaKey) && key === "s") {
                e.preventDefault();
                e.stopPropagation();
                void save();
                return;
            }
            if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                if (key === "n") setTool("nodes");
                if (key === "c") setTool("circles");
            }
        };
        document.addEventListener("keydown", onKey, { capture: true });
        return () => document.removeEventListener("keydown", onKey, { capture: true } as any);
    });

    // ---- Overlay sync with cy pan/zoom ----
    const syncOverlay = () => {
        const cy = cyRef.current,
            gEl = gRef.current;
        if (!cy || !gEl) return;
        const pan = cy.pan(),
            zoom = cy.zoom();
        gEl.setAttribute("transform", `translate(${pan.x}, ${pan.y}) scale(${zoom})`);
    };
    const getZoom = () => (cyRef.current ? cyRef.current.zoom() : 1);

    // ---- Circle drag/resize (delta ÷ zoom). Resize jump still pending to refine later. ----
    function updateCircle(id: string, cx?: number, cy?: number, r?: number) {
        setG((prev) => ({
            ...prev,
            circles: prev.circles.map((c) =>
                c.id === id ? { ...c, cx_rel: cx ?? c.cx_rel, cy_rel: cy ?? c.cy_rel, r_rel: r ?? c.r_rel } : c
            ),
        }));
    }

    function circleHandlers(circleId: string, currentR: number) {
        let startX = 0,
            startY = 0,
            startCX = 0,
            startCY = 0,
            startR = currentR;

        const onDownCenter = (e: React.PointerEvent<SVGCircleElement>) => {
            (e.target as Element).setPointerCapture(e.pointerId);
            startX = e.clientX;
            startY = e.clientY;
            const el = e.currentTarget as SVGCircleElement;
            startCX = el.cx.baseVal.value;
            startCY = el.cy.baseVal.value;
        };
        const onMoveCenter = (e: React.PointerEvent<SVGCircleElement>) => {
            if (!(e.target as Element).hasPointerCapture?.(e.pointerId)) return;
            const z = getZoom();
            const nx = clamp(startCX + (e.clientX - startX) / z, 0, innerW);
            const ny = clamp(startCY + (e.clientY - startY) / z, 0, innerH);
            updateCircle(circleId, pxToRel(nx, innerW), pxToRel(ny, innerH), undefined);
        };

        const onDownHandle = (e: React.PointerEvent<SVGCircleElement>) => {
            (e.target as Element).setPointerCapture(e.pointerId);
            startX = e.clientX;
            startR = currentR;
        };
        const onMoveHandle = (e: React.PointerEvent<SVGCircleElement>) => {
            if (!(e.target as Element).hasPointerCapture?.(e.pointerId)) return;
            const z = getZoom();
            const nr = Math.max(10, startR + (e.clientX - startX) / z); // horizontal drag
            updateCircle(circleId, undefined, undefined, pxToRel(nr, Math.min(innerW, innerH)));
        };

        return { onDownCenter, onMoveCenter, onDownHandle, onMoveHandle };
    }

    // ---- Cytoscape: editor settings + node drag -> x_rel/y_rel ----
    function onCyReady(cy: Core) {
        cyRef.current = cy;

        // Enable pan/zoom + (initial) node dragging; we’ll flip grabbability when tool changes.
        cy.autoungrabify(false);
        cy.nodes().grabify();

        restoreViewport(cy);
        syncOverlay();
        cy.on("viewport", () => {
            syncOverlay();
            saveViewport(cy);
        });

        cy.on("dragfree", "node", (e: EventObjectNode) => {
            const id = e.target.id();
            const pos = e.target.position(); // world coords
            setG((prev) => ({
                ...prev,
                nodes: prev.nodes.map((n) =>
                    n.id === id ? { ...n, x_rel: pxToRel(pos.x, innerW), y_rel: pxToRel(pos.y, innerH) } : n
                ),
            }));
        });
    }

    // Flip node draggability depending on tool
    useEffect(() => {
        const cy = cyRef.current;
        if (!cy) return;
        if (tool === "nodes") {
            cy.nodes().grabify();
        } else {
            cy.nodes().ungrabify();
        }
    }, [tool]);

    // hard cleanup so Editor doesn't leak settings
    useEffect(() => {
        return () => {
            if (cyRef.current) {
                cyRef.current.off("viewport dragfree");
                cyRef.current.destroy();
                cyRef.current = null;
            }
        };
    }, []);

    // --- UI helpers ---
    const ModePill = (
        <div
            style={{
                position: "fixed",
                top: 12,
                right: 12,
                zIndex: 9999,
                display: "flex",
                gap: 6,
                alignItems: "center",
            }}
        >
            <span style={{ fontSize: 12, color: "#334155" }}>Edit tool:</span>
            <button
                onClick={() => setTool("nodes")}
                title="Drag nodes (N)"
                style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid #cbd5e1",
                    background: tool === "nodes" ? "#dbeafe" : "#f1f5f9",
                    fontSize: 12,
                    cursor: "pointer",
                }}
            >
                Nodes (N)
            </button>
            <button
                onClick={() => setTool("circles")}
                title="Drag/resize circles (C)"
                style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid #cbd5e1",
                    background: tool === "circles" ? "#fde68a" : "#f1f5f9",
                    fontSize: 12,
                    cursor: "pointer",
                }}
            >
                Circles (C)
            </button>
        </div>
    );

    return (
        <div style={{ width, margin: "24px auto" }}>
            {ModePill}

            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <button onClick={() => setG(JSON.parse(JSON.stringify(data)))}>Reset</button>
                <button onClick={() => void save()}>Save (Ctrl+S)</button>
            </div>

            <div
                style={{
                    position: "relative",
                    width,
                    height,
                    borderRadius: 8,
                    background: "#f7fafb",
                    border: "1px solid #e4e9ee",
                }}
            >
                {/* Overlay ABOVE Cytoscape.
           - When tool = 'nodes': pointerEvents:none so drags go to Cytoscape (nodes).
           - When tool = 'circles': only the shapes/handles accept events; the rest passes through. */}
                <div
                    style={{
                        position: "absolute",
                        left: pad,
                        top: pad,
                        width: innerW,
                        height: innerH,
                        zIndex: 2,
                        pointerEvents: tool === "nodes" ? "none" : "auto",
                    }}
                >
                    <svg width={innerW} height={innerH} style={{ display: "block" }}>
                        <g ref={gRef}>
                            {g.circles.map((c) => {
                                const cx = relToPx(c.cx_rel, innerW, innerW * 0.25);
                                const cy = relToPx(c.cy_rel, innerH, innerH * 0.5);
                                const r = relToPx(
                                    c.r_rel,
                                    Math.min(innerW, innerH),
                                    Math.min(innerW, innerH) * 0.22
                                );
                                const h = circleHandlers(c.id, r);
                                return (
                                    <g key={c.id}>
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r={r}
                                            fill={c.color ?? "#cde"}
                                            fillOpacity={0.25}
                                            stroke={c.color ?? "#99b"}
                                            onPointerDown={tool === "circles" ? h.onDownCenter : undefined}
                                            onPointerMove={tool === "circles" ? h.onMoveCenter : undefined}
                                            style={{
                                                cursor: tool === "circles" ? "move" : "default",
                                                pointerEvents: tool === "circles" ? "auto" : "none",
                                            }}
                                        />
                                        <text
                                            x={cx}
                                            y={cy - r - 8}
                                            textAnchor="middle"
                                            fontSize={13}
                                            fontFamily="system-ui, Segoe UI, Arial, sans-serif"
                                            fontStyle="italic"
                                            fill="#23343d"
                                            style={{ pointerEvents: "none" }}
                                        >
                                            {c.label}
                                        </text>
                                        {/* resize handle (east) */}
                                        <circle
                                            cx={cx + r}
                                            cy={cy}
                                            r={6}
                                            fill="#333"
                                            fillOpacity={0.6}
                                            onPointerDown={tool === "circles" ? h.onDownHandle : undefined}
                                            onPointerMove={tool === "circles" ? h.onMoveHandle : undefined}
                                            style={{
                                                cursor: tool === "circles" ? "ew-resize" : "default",
                                                pointerEvents: tool === "circles" ? "auto" : "none",
                                            }}
                                        />
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                </div>

                {/* Cytoscape BELOW overlay */}
                <CytoscapeComponent
                    elements={[
                        ...g.nodes.map((n) => ({
                            data: { id: n.id, label: n.label },
                            position: {
                                x: relToPx(n.x_rel, innerW, innerW * 0.5),
                                y: relToPx(n.y_rel, innerH, innerH * 0.5),
                            },
                            grabbable: true,
                        })),
                        ...g.edges.map((e) => ({
                            data: { id: e.id, source: e.source, target: e.target, label: e.relation },
                        })),
                    ] as any}
                    style={{
                        position: "absolute",
                        left: pad,
                        top: pad,
                        width: innerW,
                        height: innerH,
                        zIndex: 1,
                    }}
                    layout={{ name: "preset" }}
                    userPanningEnabled={true}
                    userZoomingEnabled={true}
                    boxSelectionEnabled={false}
                    stylesheet={stylesheet as any}
                    pixelRatio={1}
                    cy={onCyReady}
                />
            </div>
        </div>
    );
}

function mergePatch(base: GraphData, patch: Partial<GraphData>): GraphData {
    const byId = <T extends { id: string }>(arr: T[]) => new Map(arr.map((x) => [x.id, x]));
    const pC = byId(patch.circles ?? []);
    const pN = byId(patch.nodes ?? []);
    return {
        circles: base.circles.map((c) => Object.assign({}, c, pC.get(c.id) ?? {})),
        nodes: base.nodes.map((n) => Object.assign({}, n, pN.get(n.id) ?? {})),
        edges: base.edges,
    };
}
