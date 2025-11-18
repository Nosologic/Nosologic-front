import CytoscapeComponent from "react-cytoscapejs";
import cytoscape, { ElementDefinition } from "cytoscape";
import { makeStyles } from "./cyStyles";
import type { GraphData, Circle, Node, Edge } from "./types";
import { mergeCoreAndLayout, relToPx } from "./utils";
import { useEffect, useMemo, useState } from "react";

type Props = {
    data: GraphData;
    aspectRatio?: number; // canvas width/height ratio, default 1 (square)
};

/** fallback palette in case a color is missing */
const DEFAULTS = {
    circle: "#98b6ff",
    node:   "#4aa3a3",
    edge:   "#9aa3ad"
};

export default function Viewer({ data, aspectRatio = 1 }: Props) {
    // --- merge in any saved layout shipped with the site (if present) -------------
    const [layout, setLayout] = useState<Partial<GraphData> | null>(null);

    useEffect(() => {
        // optional load of a layout json (manual.json). Ignore errors quietly.
        fetch("/data/layouts/manual.json")
            .then(r => (r.ok ? r.json() : null))
            .then(setLayout)
            .catch(() => setLayout(null));
    }, []);

    const g: GraphData = useMemo(
        () => mergeCoreAndLayout(data, layout || undefined),
        [data, layout]
    );

    // --- build cytoscape elements --------------------------------------------------
    // we’ll map 0..100 “relative” coords to the current canvas size later
    function buildElements(canvasSize: number): ElementDefinition[] {
        const circles: ElementDefinition[] = (g.circles as Circle[]).map(c => ({
            group: "nodes",
            data: {
                id: `circle:${c.id}`,      // avoid id clash with disease nodes
                label: c.label,
                isCircle: true,
                diameter: relToPx((c.r_rel ?? 0) * 2, canvasSize),
                color: c.color || DEFAULTS.circle
            },
            position: {
                x: relToPx(c.cx_rel, canvasSize),
                y: relToPx(c.cy_rel, canvasSize)
            }
        }));

        const nodes: ElementDefinition[] = (g.nodes as Node[]).map(n => ({
            group: "nodes",
            data: {
                id: n.id,
                label: n.label,
                url: n.url,
                color: n.color || DEFAULTS.node
            },
            position: {
                x: relToPx(n.x_rel, canvasSize),
                y: relToPx(n.y_rel, canvasSize)
            }
        }));

        const edges: ElementDefinition[] = (g.edges as Edge[]).map(e => ({
            group: "edges",
            data: {
                id: e.id,
                source: e.source,
                target: e.target,
                relation: e.relation,
                url: e.url,
                color: e.color || DEFAULTS.edge
            }
        }));

        return [...circles, ...nodes, ...edges];
    }

    // --- render -------------------------------------------------------------------
    // compute a square canvas, then let container control actual size via CSS
    const stylesheet = useMemo(() => makeStyles(), []);
    const [cy, setCy] = useState<cytoscape.Core | null>(null);

    // hook up interactions (click -> navigate)
    useEffect(() => {
        if (!cy) return;

        // click disease node (not a circle)
        cy.on("tap", "node[!isCircle]", (evt) => {
            const d = evt.target.data() as { id: string; url?: string };
            const url = d.url || `/diseases/${encodeURIComponent(d.id)}`;
            window.location.href = url;
        });

        // click edge -> evseq
        cy.on("tap", "edge", (evt) => {
            const d = evt.target.data() as { id: string; url?: string };
            const url = d.url || `/evseq/${encodeURIComponent(d.id)}`;
            window.location.href = url;
        });

        return () => { cy.removeAllListeners(); };
    }, [cy]);

    // We rebuild elements when size changes; CytoscapeComponent passes a ref we can read later.
    const canvasPx = 1000; // any fixed “virtual” canvas; relToPx maps 0..100 against this.
    const elements = useMemo(() => buildElements(canvasPx), [g]);

    return (
        <div style={{ width: "100%", height: `calc(70vw/${aspectRatio})`, maxHeight: "80vh" }}>
            <CytoscapeComponent
                cy={setCy}
                elements={elements}
                stylesheet={stylesheet}
                wheelSensitivity={0.2}
                style={{ width: "100%", height: "100%", background: "#edf3f7" }}
            />
        </div>
    );
}
