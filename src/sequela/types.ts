// Canonical data shapes shared by Viewer & Editor.

export type Circle = {
    id: string;
    label: string;
    color?: string;
    cx_rel?: number; // 0..100
    cy_rel?: number; // 0..100
    r_rel?: number;  // 0..100
    url?: string;
};

export type Node = {
    id: string;
    label: string;
    classIds: string[];
    url?: string;
    x_rel?: number; // 0..100
    y_rel?: number; // 0..100
};

export type Edge = {
    id: string;       // `${source}__to__${target}`
    source: string;
    target: string;
    relation: string;
    url?: string;
};

export type GraphData = {
    circles: Circle[];
    nodes: Node[];
    edges: Edge[];
};
