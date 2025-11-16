// Small, pure helpers.

export const clamp = (n: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, n));

export function relToPx(rel: number | undefined, size: number, fallback: number) {
    return typeof rel === "number" ? (rel / 100) * size : fallback;
}

export function pxToRel(px: number, size: number) {
    return clamp((px / size) * 100, 0, 100);
}

// Tiny "version" so we only reapply session patches to the same graph shape.
export function hashGraphShape(ids: { circles: string[]; nodes: string[]; edges: number }) {
    return `${ids.circles.slice().sort().join(",")}|${ids.nodes.slice().sort().join(",")}|e${ids.edges}`;
}

export function makeNodeColorMap(circles: { id: string; color?: string }[]) {
    const fallback = ["#6aa", "#8aa", "#a86", "#68a", "#6a8", "#a66", "#888"];
    const map = new Map<string, string>();
    circles.forEach((c, i) => map.set(c.id, c.color ?? fallback[i % fallback.length]));
    return map;
}
