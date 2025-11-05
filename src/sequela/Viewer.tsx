// src/sequela/Viewer.tsx
import CytoscapeComponent from "react-cytoscapejs";

export type Circle = { id: string; label: string; color?: string; cx_rel?: number; cy_rel?: number; r_rel?: number };
export type Node   = { id: string; label: string; classIds: string[]; x_rel?: number; y_rel?: number };
export type Edge   = { id: string; source: string; target: string; relation: string };
export type GraphData = { circles: Circle[]; nodes: Node[]; edges: Edge[] };

function relToPx(rel: number | undefined, size: number, fallback: number) {
    if (typeof rel !== "number") return fallback;
    return (rel / 100) * size;
}

export default function Viewer({
                                   data,
                                   aspectRatio = 1,
                                   onOpenNode,
                                   onOpenEdge,
                               }: {
    data: GraphData;
    aspectRatio?: number;
    onOpenNode?: (id: string) => void;
    onOpenEdge?: (source: string, target: string) => void;
}) {
    const pad = 16;
    const width = 960;
    const height = Math.round(width / aspectRatio);

    const svg = (
        <svg width={width} height={height} style={{ position: "absolute", inset: pad }}>
            {data.circles.map((c) => {
                const cx = relToPx(c.cx_rel, width - pad * 2, width * 0.25);
                const cy = relToPx(c.cy_rel, height - pad * 2, height * 0.5);
                const r  = relToPx(c.r_rel,  Math.min(width, height) - pad * 2, Math.min(width, height) * 0.22);
                return (
                    <g key={c.id} aria-label={c.label}>
                        <circle cx={cx} cy={cy} r={r} fill={c.color ?? "#cde"} fillOpacity={0.35} stroke={c.color ?? "#99b"} />
                        <text x={cx} y={cy - r - 8} textAnchor="middle" fontSize={14} fill="#234">{c.label}</text>
                    </g>
                );
            })}
        </svg>
    );

    const elements = [
        ...data.nodes.map((n) => ({
            data: { id: n.id, label: n.label },
            position: {
                x: relToPx(n.x_rel, width - pad * 2, width * 0.5),
                y: relToPx(n.y_rel, height - pad * 2, height * 0.5),
            },
        })),
        ...data.edges.map((e) => ({ data: { id: e.id, source: e.source, target: e.target, label: e.relation } })),
    ];

    const colorMap = new Map(data.circles.map(c => [c.id, c.color ?? "#6aa"]));
    const stylesheet: any[] = [
        { selector: "node", style: { "background-color": "#6aa", label: "data(label)", "text-valign": "bottom", "text-margin-y": 6, "font-size": 12 } },
        { selector: "edge", style: { width: 2, "line-color": "#567", "target-arrow-color": "#567", "target-arrow-shape": "triangle", "curve-style": "bezier" } },
    ];
    data.nodes.forEach(n => {
        const c = n.classIds[0];
        if (c && colorMap.has(c)) stylesheet.push({ selector: `node[id = "${n.id}"]`, style: { "background-color": colorMap.get(c)! } });
    });

    return (
        <div style={{ position: "relative", width, height, margin: "24px auto", border: "1px solid #ddd", borderRadius: 8, background: "#f8fbfc" }}>
            {svg}
            <CytoscapeComponent
                elements={elements as any}
                style={{ position: "absolute", inset: pad }}
                layout={{ name: "preset" }}
                userZoomingEnabled={false}
                userPanningEnabled={false}
                boxSelectionEnabled={false}
                stylesheet={stylesheet as any}
                pixelRatio={1}
                cy={(cy) => {
                    cy.on("tap", "node", (e) => {
                        const id = e.target.id();
                        onOpenNode?.(id);
                    });
                    cy.on("tap", "edge", (e) => {
                        const src = e.target.source().id();
                        const tgt = e.target.target().id();
                        onOpenEdge?.(src, tgt);
                    });
                }}
            />
        </div>
    );
}

