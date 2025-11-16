// Cytoscape stylesheet builder.

import type { GraphData } from "./types";
import { makeNodeColorMap } from "./utils";

export function makeStyles(data: GraphData) {
    const colorMap = makeNodeColorMap(data.circles);

    const base: any[] = [
        {
            selector: "node",
            style: {
                "background-color": "#6aa",
                label: "data(label)",
                "text-valign": "bottom",
                "text-margin-y": 6,
                "font-size": 13,
                "font-family": "system-ui, Segoe UI, Arial, sans-serif",
                "text-wrap": "wrap",
                "text-max-width": 160,
            },
        },
        {
            selector: "edge",
            style: {
                width: 2,
                "line-color": "#4f5964",
                "target-arrow-color": "#4f5964",
                "target-arrow-shape": "triangle",
                "curve-style": "bezier",
            },
        },
    ];

    // Per-node color from its first class id
    data.nodes.forEach((n) => {
        const cid = n.classIds?.[0];
        const col = cid ? colorMap.get(cid) : undefined;
        if (col) base.push({ selector: `node[id = "${n.id}"]`, style: { "background-color": col } });
    });

    return base;
}
