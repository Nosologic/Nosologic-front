import type { GraphData } from "./types";

// --- numbers <-> percentages ----------------------------------------------
export function relToPx(rel: number, total: number): number {
    return Math.round((rel / 100) * total);
}

export function pxToRel(px: number, total: number): number {
    if (total <= 0) return 0;
    return +(px / total * 100);
}

export function clamp(v: number, lo: number, hi: number): number {
    return Math.min(hi, Math.max(lo, v));
}


/** Convert a “relative” (0..100) coordinate into pixels for a given canvas size. */
export function relToPx(rel: number, canvasSize: number): number {
    return (rel / 100) * canvasSize;
}

/** Merge a saved layout (positions/radii/colors/urls) into the core graph by id. */
export function mergeCoreAndLayout(core: GraphData, layout?: Partial<GraphData>): GraphData {
    if (!layout) return core;

    const circles = core.circles.map(c => {
        const m = layout.circles?.find(x => x.id === c.id);
        return m ? { ...c, ...pick(m, ["cx_rel","cy_rel","r_rel","color","label","id"]) } : c;
    });

    const nodes = core.nodes.map(n => {
        const m = layout.nodes?.find(x => x.id === n.id);
        return m ? { ...n, ...pick(m, ["x_rel","y_rel","color","url","label","id"]) } : n;
    });

    const edges = core.edges.map(e => {
        const m = layout.edges?.find(x => x.id === e.id);
        return m ? { ...e, ...pick(m, ["color","url","label","id"]) } : e;
    });

    return { circles, nodes, edges };
}

function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Partial<T> {
    const out: Partial<T> = {};
    for (const k of keys) if (k in obj) (out as any)[k] = obj[k];
    return out;
}

