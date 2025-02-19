import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AboutUsPage from "./pages/AboutUsPage.tsx";
import DiseasesPage from "./pages/DiseasesPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import MissionPage from "./pages/MissionPage.tsx";
import Layout from "./components/Layout.tsx";
import DiseaseDetailPage from "./pages/DiseaseDetailPage.tsx";


function App() {

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<MissionPage />}/>
                    <Route path="/home" element={<HomePage />}/>
                    <Route path="/about" element={<AboutUsPage />}/>
                    <Route path="/diseases" element={<DiseasesPage />}/>
                    <Route path="/blog" element={<BlogPage />}/>
                    <Route path="/diseases/:id" element={<DiseaseDetailPage/>}/>
                </Routes>
            </Layout>

        </BrowserRouter>
    );
}

export default App
