import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUsPage from "./pages/AboutUsPage.tsx";
import DiseasesPage from "./pages/DiseasesPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import MissionPage from "./pages/MissionPage.tsx";
import Layout from "./components/Layout.tsx";
import DiseaseDetailPage from "./pages/DiseaseDetailPage.tsx";
import ClusterDetailPage from "./pages/ClusterDetailPage.tsx";


function App() {

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<MissionPage />}/>
                    {/* TODO: homepage instead of MissionPage for /home */}
                    <Route path="/home" element={<MissionPage />}/>
                    <Route path="/about" element={<AboutUsPage />}/>
                    <Route path="/diseases" element={<DiseasesPage />}/>
                    <Route path="/blog" element={<BlogPage />}/>
                    <Route path="/diseases/:id" element={<DiseaseDetailPage/>}/>
                    <Route path="/clusters/:id" element={<ClusterDetailPage/>}/>
                </Routes>
            </Layout>

        </BrowserRouter>
    );
}

export default App
