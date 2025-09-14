import React, { useState, useEffect } from "react";

const SocialImpactDashboard = () => {
  const [impactMetrics, setImpactMetrics] = useState({
    artisansHelped: 0,
    productsAnalyzed: 0,
    voiceAnalyses: 0,
    revenueGenerated: 0,
    digitalTransformation: 0,
  });

  useEffect(() => {
    // Simulate real-time impact metrics for demo
    const interval = setInterval(() => {
      setImpactMetrics((prev) => ({
        artisansHelped: prev.artisansHelped + Math.floor(Math.random() * 3),
        productsAnalyzed: prev.productsAnalyzed + Math.floor(Math.random() * 5),
        voiceAnalyses: prev.voiceAnalyses + Math.floor(Math.random() * 2),
        revenueGenerated:
          prev.revenueGenerated + Math.floor(Math.random() * 5000),
        digitalTransformation:
          prev.digitalTransformation + Math.floor(Math.random() * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const impactStories = [
    {
      artisan: "Rajesh from Jaipur",
      craft: "Blue Pottery",
      impact:
        "Increased online sales by 300% after implementing AI-suggested pricing strategy",
      before: "₹2,000/month",
      after: "₹8,500/month",
      image: "🏺",
    },
    {
      artisan: "Priya from Lucknow",
      craft: "Chikankari Embroidery",
      impact:
        "Reached international customers through AI-generated social media content",
      before: "Local customers only",
      after: "15 countries",
      image: "👗",
    },
    {
      artisan: "Vikram from Kashmir",
      craft: "Pashmina Shawls",
      impact:
        "Digitized business operations and reduced order processing time by 70%",
      before: "Manual processes",
      after: "Automated workflow",
      image: "🧣",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">
        Real-Time Social Impact
      </h2>

      {/* Live Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {impactMetrics.artisansHelped}
          </div>
          <div className="text-sm text-text-secondary">Artisans Helped</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {impactMetrics.productsAnalyzed}
          </div>
          <div className="text-sm text-text-secondary">Products Analyzed</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {impactMetrics.voiceAnalyses}
          </div>
          <div className="text-sm text-text-secondary">Voice Analyses</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            ₹{impactMetrics.revenueGenerated.toLocaleString()}
          </div>
          <div className="text-sm text-text-secondary">Revenue Generated</div>
        </div>
        <div className="text-center p-4 bg-pink-50 rounded-lg">
          <div className="text-2xl font-bold text-pink-600">
            {impactMetrics.digitalTransformation}
          </div>
          <div className="text-sm text-text-secondary">
            Digital Transformations
          </div>
        </div>
      </div>

      {/* Impact Stories */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-text-primary">Success Stories</h3>
        {impactStories.map((story, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="text-4xl">{story.image}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary">
                {story.artisan} - {story.craft}
              </h4>
              <p className="text-sm text-text-secondary mb-2">{story.impact}</p>
              <div className="flex gap-4 text-sm">
                <span className="text-red-600">Before: {story.before}</span>
                <span className="text-green-600">After: {story.after}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Google Cloud AI Integration */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-text-primary">
          Powered by Google Cloud AI
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🎤</div>
            <div className="text-sm font-semibold">Speech-to-Text</div>
            <div className="text-xs text-text-secondary">Voice Analysis</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🧠</div>
            <div className="text-sm font-semibold">Vertex AI</div>
            <div className="text-xs text-text-secondary">Business Insights</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">👁️</div>
            <div className="text-sm font-semibold">Vision AI</div>
            <div className="text-xs text-text-secondary">Product Analysis</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-semibold">Gemini</div>
            <div className="text-xs text-text-secondary">
              Content Generation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialImpactDashboard;
