// canonical types the viewer + editor expect

export interface Circle {
    id: string;
    label: string;
    color?: string;
    cx_rel: number;   // 0..100 in relative %
    cy_rel: number;   // 0..100 in relative %
    r_rel: number;    // radius in relative %
}

export interface Node {
    id: string;
    label: string;
    classIds: string[];
    x_rel: number;    // 0..100 in relative %
    y_rel: number;    // 0..100 in relative %
    url?: string;     // optional deep link
    color?: string;   // optional per-node color
}

export interface Edge {
    id: string;
    source: string;
    target: string;
    relation: string;
    url?: string;     // optional deep link
    color?: string;   // optional per-edge color
}

export interface GraphData {
    circles: Circle[];
    nodes:   Node[];
    edges:   Edge[];
}
