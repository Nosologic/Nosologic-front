import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { GraphData } from "../sequela/types";
import Viewer from "../sequela/Viewer";
import Editor from "../sequela/Editor";

// /viz          -> viewer (pan/zoom, no drag)
// /viz?edit=1   -> editor (drag nodes + drag/resize circles)
// Hotkeys: Ctrl+E toggles; Ctrl+S saves in editor.

export default function VizPage() {
    const [data, setData] = useState<GraphData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [search] = useSearchParams();
    const navigate = useNavigate();

    const edit = search.get("edit") === "1";

    useEffect(() => {
        fetch("/data/graph.json?_=" + Date.now())
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then(setData)
            .catch((e) => setError(String(e)));
    }, []);

    // Robust Ctrl+E toggle using react-router navigation
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "e") {
                e.preventDefault();
                e.stopPropagation();
                navigate(edit ? "/viz" : "/viz?edit=1");
            }
        };
        document.addEventListener("keydown", onKey, { capture: true });
        return () => document.removeEventListener("keydown", onKey, { capture: true } as any);
    }, [edit, navigate]);

    if (error) return <div style={{ padding: 16 }}>Error: {error}</div>;
    if (!data) return <div style={{ padding: 16 }}>Loading…</div>;

    // Tiny mode pill (top-right) for clarity + click toggle
    const ModePill = (
        <button
            onClick={() => navigate(edit ? "/viz" : "/viz?edit=1")}
            style={{
                position: "fixed",
                top: 12,
                right: 12,
                zIndex: 9999,
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid #cbd5e1",
                background: edit ? "#fde68a" : "#e2e8f0",
                fontSize: 12,
                cursor: "pointer",
            }}
            title="Click to toggle Viewer/Editor (Ctrl+E)"
        >
            {edit ? "Editing" : "Viewing"}
        </button>
    );

    if (edit) {
        return (
            <>
                {ModePill}
                <Editor
                    data={data}
                    aspectRatio={1}
                    // Optional "save to server" hook (wire when backend is ready):
                    // postSave={(g) => fetch("/api/save-graph", {
                    //   method: "POST",
                    //   headers: { "Content-Type": "application/json", Authorization: "Bearer <token>" },
                    //   body: JSON.stringify(g),
                    // })}
                />
            </>
        );
    }

    return (
        <>
            {ModePill}
            <Viewer
                data={data}
                aspectRatio={1}
                onOpenNode={(id, url) => {
                    if (url) window.open(url, "_self");
                    else navigate(`/diseases/${encodeURIComponent(id)}`);
                }}
                onOpenEdge={(src, tgt, url) => {
                    if (url) window.open(url, "_self");
                    else navigate(`/sequela/${encodeURIComponent(src)}/${encodeURIComponent(tgt)}`);
                }}
            />
        </>
    );
}


