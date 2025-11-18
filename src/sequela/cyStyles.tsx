import type { Stylesheet } from "cytoscape";

/**
 * Cytoscape stylesheet for the sequela visualiser.
 * - Nodes: teal dots with centered labels (above everything).
 * - Edges: grey lines with triangle arrowheads.
 * - Circles (category “class” nodes): large translucent disks with italic labels.
 *   These are real nodes with data.isCircle === true.
 */
export const makeStyles = (): Stylesheet[] => [
    // generic disease nodes
    {
        selector: "node[!isCircle]",
        style: {
            "background-color": "data(color)",
            "background-opacity": 1,
            "border-width": 0,
            "width": 14,
            "height": 14,
            "z-index": 999,
            "label": "data(label)",
            "font-size": 10,
            "text-valign": "top",
            "text-halign": "center",
            "text-margin-y": -6,
            "color": "#223",
            "text-outline-width": 0
        }
    },

    // class circles
    {
        selector: "node[isCircle]",
        style: {
            "shape": "ellipse",
            "background-color": "data(color)",
            "background-opacity": 0.12,
            "border-color": "data(color)",
            "border-width": 1,
            "width": "data(diameter)",    // px, see viewer builder
            "height": "data(diameter)",
            "label": "data(label)",
            "font-style": "italic",
            "font-size": 11,
            "text-halign": "center",
            "text-valign": "top",
            "text-margin-y": -6,
            "z-index": 1,
            "color": "#394b59"
        }
    },

    // edges
    {
        selector: "edge",
        style: {
            "line-color": "data(color)",
            "width": 2,
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            "target-arrow-color": "data(color)",
            "z-index": 500
        }
    },

    // sensible fallbacks if data(color) is missing
    {
        selector: "node[!color]",
        style: { "background-color": "#4aa3a3" }
    },
    {
        selector: "node[isCircle][!color]",
        style: { "background-color": "#98b6ff", "border-color": "#98b6ff" }
    },
    {
        selector: "edge[!color]",
        style: { "line-color": "#9aa3ad", "target-arrow-color": "#9aa3ad" }
    }
];
