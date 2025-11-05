import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Viewer, { GraphData } from "../sequela/Viewer";

export default function VizPage() {
    const [data, setData] = useState<GraphData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/data/graph.json?_=" + Date.now())
            .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
            .then(setData)
            .catch(e => setError(String(e)));
    }, []);

    if (error) return <div style={{ padding: 16 }}>Error: {error}</div>;
    if (!data) return <div style={{ padding: 16 }}>Loading…</div>;

    return (
        <Viewer
            data={data}
            aspectRatio={1}
            onOpenNode={(id) => navigate(`/diseases/${encodeURIComponent(id)}`)}
            onOpenEdge={(src, tgt) => navigate(`/sequela/${encodeURIComponent(src)}/${encodeURIComponent(tgt)}`)}
        />
    );
}

