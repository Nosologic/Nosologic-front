import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownPage({
                                         buildPath,
                                     }: {
    buildPath: (id: string) => string;
}) {
    const { id = "" } = useParams();
    const [text, setText] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = buildPath(id);
        setText("");
        setError(null);
        fetch(url + `?t=${Date.now()}`)
            .then((r) => (r.ok ? r.text() : Promise.reject(`${r.status} ${r.statusText}`)))
            .then(setText)
            .catch((e) => setError(String(e)));
    }, [id, buildPath]);

    if (error) return <main style={{ padding: 16 }}>Could not load page: {error}</main>;
    if (!text) return <main style={{ padding: 16 }}>Loading…</main>;

    return (
        <main style={{ maxWidth: 980, margin: "40px auto", padding: "0 16px" }}>
            <article style={{ lineHeight: 1.65, color: "#1f2d38" }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </article>
        </main>
    );
}
