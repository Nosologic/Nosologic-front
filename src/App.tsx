import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AboutUsPage from "./pages/AboutUsPage.tsx";
import DiseasePage from "./pages/DiseasePage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import MissionPage from "./pages/MissionPage.tsx";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MissionPage />}/>
                <Route path="/home" element={<HomePage />}/>
                <Route path="/about" element={<AboutUsPage />}/>
                <Route path="/diseases" element={<DiseasePage />}/>
                <Route path="/blog" element={<BlogPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App
