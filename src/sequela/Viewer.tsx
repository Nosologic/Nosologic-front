import { useEffect, useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import type { Core, EventObjectEdge, EventObjectNode } from "cytoscape";
import type { GraphData } from "./types";
import { relToPx } from "./utils";
import { makeStyles } from "./cyStyles";
import { restoreViewport, saveViewport } from "./viewport";

export default function Viewer({
                                   data,
                                   aspectRatio = 1,
                                   onOpenNode,
                                   onOpenEdge,
                               }: {
    data: GraphData;
    aspectRatio?: number;
    onOpenNode?: (id: string, url?: string) => void;
    onOpenEdge?: (src: string, tgt: string, url?: string) => void;
}) {
    const pad = 16;
    const width = 980;
    const height = Math.round(width / aspectRatio);
    const innerW = width - pad * 2;
    const innerH = height - pad * 2;

    const elements = [
        ...data.nodes.map((n) => ({
            data: { id: n.id, label: n.label, url: n.url },
            position: {
                x: relToPx(n.x_rel, innerW, innerW * 0.5),
                y: relToPx(n.y_rel, innerH, innerH * 0.5),
            },
        })),
        ...data.edges.map((e) => ({
            data: { id: e.id, source: e.source, target: e.target, label: e.relation, url: e.url },
        })),
    ];

    const stylesheet = makeStyles(data);
    const cyRef = useRef<Core | null>(null);
    const gRef = useRef<SVGGElement | null>(null);

    const syncOverlay = () => {
        const cy = cyRef.current, g = gRef.current;
        if (!cy || !g) return;
        const pan = cy.pan(), zoom = cy.zoom();
        g.setAttribute("transform", `translate(${pan.x}, ${pan.y}) scale(${zoom})`);
    };

    useEffect(() => {
        return () => {
            if (cyRef.current) {
                cyRef.current.off("viewport tap");
                cyRef.current.destroy();
                cyRef.current = null;
            }
        };
    }, []);

    return (
        <div style={{ position: "relative", width, height, margin: "24px auto", borderRadius: 8, background: "#f7fafb", border: "1px solid #e4e9ee" }}>
            {/* Circles BELOW Cytoscape so nodes render on top */}
            <div style={{ position: "absolute", left: pad, top: pad, width: innerW, height: innerH, zIndex: 0, pointerEvents: "none" }}>
                <svg width={innerW} height={innerH}>
                    <g ref={gRef}>
                        {data.circles.map((c) => {
                            const cx = relToPx(c.cx_rel, innerW, innerW * 0.25);
                            const cy = relToPx(c.cy_rel, innerH, innerH * 0.5);
                            const r  = relToPx(c.r_rel, Math.min(innerW, innerH), Math.min(innerW, innerH) * 0.22);
                            return (
                                <g key={c.id} aria-label={c.label}>
                                    <circle cx={cx} cy={cy} r={r} fill={c.color ?? "#cde"} fillOpacity={0.33} stroke={c.color ?? "#99b"} />
                                    <text x={cx} y={cy - r - 8} textAnchor="middle" fontSize={13} fontFamily="system-ui, Segoe UI, Arial, sans-serif" fontStyle="italic" fill="#23343d">
                                        {c.label}
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                </svg>
            </div>

            {/* Cytoscape ABOVE circles */}
            <CytoscapeComponent
                elements={elements as any}
                style={{ position: "absolute", left: pad, top: pad, width: innerW, height: innerH, zIndex: 1 }}
                layout={{ name: "preset" }}
                userPanningEnabled={true}
                userZoomingEnabled={true}
                boxSelectionEnabled={false}
                stylesheet={stylesheet as any}
                pixelRatio={1}
                cy={(cy) => {
                    const core = cy as Core;
                    cyRef.current = core;

                    // Viewer: nodes must NOT drag
                    core.autoungrabify(true);
                    core.nodes().ungrabify();

                    restoreViewport(core);
                    syncOverlay();
                    core.on("viewport", () => { syncOverlay(); saveViewport(core); });

                    // NODE: open /diseases-md/<nodeId>
                    core.on("tap", "node", (e) => {
                        const id = e.target.id();                    // e.g. "hypoxia"
                        saveViewport(core);
                        window.location.href = `/diseases-md/${id}`;
                    });

                    // EDGE: open /evseq/<edgeId>
                    core.on("tap", "edge", (e) => {
                        const edgeId = e.target.id();                // e.g. "hypoxia__to__tuberculosis"
                        saveViewport(core);
                        window.location.href = `/evseq/${edgeId}`;
                    });


                }}
            />
        </div>
    );
}
