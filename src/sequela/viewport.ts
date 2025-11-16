// Persist Cytoscape viewport (zoom + pan) across navigations.

const KEY = "viz:v2:viewport";

export function saveViewport(cy: any) {
    if (!cy) return;
    try {
        sessionStorage.setItem(KEY, JSON.stringify({ zoom: cy.zoom(), pan: cy.pan() }));
    } catch {}
}

export function restoreViewport(cy: any) {
    if (!cy) return;
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return;
    try {
        const { zoom, pan } = JSON.parse(raw);
        if (typeof zoom === "number" && pan) cy.viewport({ zoom, pan });
    } catch {}
}
