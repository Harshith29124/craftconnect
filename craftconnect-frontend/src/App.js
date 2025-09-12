import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductUpload from './pages/ProductUpload';
import BusinessInsights from './pages/BusinessInsights';
import GrowthOpportunities from './pages/GrowthOpportunities';
import ArtisanToolkit from './pages/ArtisanToolkit';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<ProductUpload />} />
        <Route path="/insights" element={<BusinessInsights />} />
        <Route path="/opportunities" element={<GrowthOpportunities />} />
        <Route path="/toolkit" element={<ArtisanToolkit />} />
      </Routes>
    </div>
  );
}

export default App;
