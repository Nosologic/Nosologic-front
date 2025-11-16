// src/App.tsx
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AboutUsPage from "./pages/AboutUsPage.tsx";
import DiseasesPage from "./pages/DiseasesPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import MissionPage from "./pages/MissionPage.tsx";
import Layout from "./components/Layout.tsx";

import DiseaseDetailPage from "./pages/DiseaseDetailPage.tsx";
import ClusterDetailPage from "./pages/ClusterDetailPage.tsx";

import VizPage from "./pages/VizPage.tsx";
import MarkdownPage from "./pages/MarkdownPage";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Main site */}
                    <Route path="/" element={<MissionPage />} />
                    <Route path="/home" element={<MissionPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/diseases" element={<DiseasesPage />} />
                    <Route path="/blog" element={<BlogPage />} />

                    {/* Existing detail pages from the original app */}
                    <Route path="/diseases/:id" element={<DiseaseDetailPage />} />
                    <Route path="/clusters/:id/detail" element={<ClusterDetailPage />} />

                    {/* Visualization */}
                    <Route path="/viz" element={<VizPage />} />

                    {/* Markdown-backed routes (IDs map directly to filenames) */}
                    <Route
                        path="/diseases-md/:id"
                        element={
                            <MarkdownPage buildPath={(id) => `/data/sequela/pages/diseases/${id}.md`} />
                        }
                    />
                    <Route
                        path="/evseq/:id"
                        element={
                            <MarkdownPage buildPath={(id) => `/data/sequela/pages/evseqs/${id}.md`} />
                        }
                    />
                    <Route
                        path="/clusters/:id"
                        element={
                            <MarkdownPage buildPath={(id) => `/data/sequela/pages/clusters/${id}.md`} />
                        }
                    />

                    {/* Optional: keep old links working */}
                    <Route
                        path="/diseases/sickle-cell-disease"
                        element={<Navigate to="/diseases-md/sickle-cell-disease" replace />}
                    />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
