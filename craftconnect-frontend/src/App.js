import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductUpload from './pages/ProductUpload';
import BusinessInsights from './pages/BusinessInsights';
import GrowthOpportunities from './pages/GrowthOpportunities';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<ProductUpload />} />
        <Route path="/insights" element={<BusinessInsights />} />
        <Route path="/opportunities" element={<GrowthOpportunities />} />
      </Routes>
    </div>
  );
}

export default App;



