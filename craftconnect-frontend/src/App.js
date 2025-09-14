import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductUpload from "./pages/ProductUpload";
import BusinessInsights from "./pages/BusinessInsights";
import GrowthOpportunities from "./pages/GrowthOpportunities";
import ArtisanToolkit from "./pages/ArtisanToolkit";
import StorytellingStudio from "./pages/StorytellingStudio";
import HackathonDemo from "./pages/HackathonDemo";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<ProductUpload />} />
        <Route path="/insights" element={<BusinessInsights />} />
        <Route path="/opportunities" element={<GrowthOpportunities />} />
        <Route path="/toolkit" element={<ArtisanToolkit />} />
        <Route path="/storytelling" element={<StorytellingStudio />} />
        <Route path="/demo" element={<HackathonDemo />} />
      </Routes>
    </div>
  );
}

export default App;
