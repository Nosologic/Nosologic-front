import { useEffect, useMemo, useState } from "react";
import Viewer from "../sequela/Viewer";
import Editor from "../sequela/Editor";
import type { CoreData, LayoutData, GraphData } from "../sequela/types";
import { mergeCoreAndLayout } from "../sequela/utils";

export default function VizPage() {
    const [core, setCore] = useState<CoreData | null>(null);
    const [layout, setLayout] = useState<LayoutData | null>(null);
    const [edit, setEdit] = useState<boolean>(false);

    // Ctrl+E toggles edit
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "e") {
                e.preventDefault();
                setEdit(prev => !prev);
            }
        };
        document.addEventListener("keydown", onKey, { capture: true });
        return () => document.removeEventListener("keydown", onKey, { capture: true } as any);
    }, []);

    // Load core + layout
    useEffect(() => {
        let cancel = false;
        const bust = `?t=${Date.now()}`;

        fetch(`/data/core.json${bust}`)
            .then(r => r.ok ? r.json() : Promise.reject(r.status))
            .then((j: CoreData) => { if (!cancel) setCore(j); })
            .catch(() => { if (!cancel) setCore({ circles: [], nodes: [], edges: [] }); });

        fetch(`/data/layouts/manual.json${bust}`)
            .then(r => r.ok ? r.json() : Promise.reject(r.status))
            .then((j: LayoutData) => { if (!cancel) setLayout(j); })
            .catch(() => { if (!cancel) setLayout({ circles: [], nodes: [] }); });

        return () => { cancel = true; };
    }, []);

    const data: GraphData | null = useMemo(() => {
        if (!core || !layout) return null;
        return mergeCoreAndLayout(core, layout);
    }, [core, layout]);

    if (!data) return <div style={{ padding: 16 }}>Loading visualization…</div>;

    return edit ? <Editor data={data} /> : <Viewer data={data} />;
}
