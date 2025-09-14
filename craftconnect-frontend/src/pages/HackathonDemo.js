import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SocialImpactDashboard from "../components/SocialImpactDashboard";
import VoiceRecorder from "../components/VoiceRecorder";

const HackathonDemo = () => {
  const [demoStep, setDemoStep] = useState(1);
  const [analysis, setAnalysis] = useState(null);
  const navigate = useNavigate();

  const demoSteps = [
    {
      id: 1,
      title: "Problem Statement",
      description:
        "Indian artisans face digital divide and limited market reach",
      icon: "🎯",
    },
    {
      id: 2,
      title: "AI-Powered Voice Analysis",
      description: "Speak about your craft business and get instant insights",
      icon: "🎤",
    },
    {
      id: 3,
      title: "Smart Product Upload",
      description: "Upload craft photos for AI categorization and pricing",
      icon: "📸",
    },
    {
      id: 4,
      title: "Social Impact Results",
      description: "See real-time impact on artisan communities",
      icon: "📊",
    },
  ];

  const handleAnalysisComplete = (analysisResult) => {
    setAnalysis(analysisResult);
    setDemoStep(4);
  };

  const problemStatement = {
    challenge:
      "Indian artisans and craftsmen, rich in traditional skills and cultural heritage, often face significant challenges in the modern digital marketplace.",
    issues: [
      "Lack of digital marketing skills",
      "Limited resources for technology adoption",
      "Difficulty bridging traditional craftsmanship with contemporary consumer trends",
      "Restricted market reach and profitability",
      "Disconnect between valuable art forms and digitally-native audience",
    ],
    solution:
      "CraftConnect leverages Google Cloud AI to empower artisans with voice-driven business insights, smart product analysis, and digital marketing tools.",
  };

  const googleCloudFeatures = [
    {
      service: "Speech-to-Text API",
      usage: "Converts artisan voice descriptions to text for analysis",
      impact: "Makes technology accessible to non-tech-savvy artisans",
    },
    {
      service: "Vertex AI (Gemini)",
      usage: "Generates personalized business insights and recommendations",
      impact: "Provides expert-level business consulting through AI",
    },
    {
      service: "Vision AI",
      usage: "Analyzes craft photos for categorization and pricing suggestions",
      impact: "Automates product cataloging and market positioning",
    },
    {
      service: "Natural Language API",
      usage:
        "Processes and understands craft descriptions and cultural context",
      impact:
        "Preserves cultural heritage while enabling digital transformation",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Demo Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4">
            {demoSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => setDemoStep(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  demoStep === step.id
                    ? "bg-primary text-white"
                    : "bg-white text-text-secondary hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{step.icon}</span>
                <span className="font-semibold">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 1: Problem Statement */}
        {demoStep === 1 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                Google Gen AI Exchange Hackathon
              </h1>
              <h2 className="text-2xl font-semibold text-primary mb-6">
                CraftConnect: AI-Powered Marketplace Assistant
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Empowering Indian artisans through Google Cloud AI to bridge the
                digital divide and expand their market reach
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-text-primary">
                Problem Statement
              </h3>
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                {problemStatement.challenge}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-text-primary">
                    Key Challenges:
                  </h4>
                  <ul className="space-y-2">
                    {problemStatement.issues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span className="text-text-secondary">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-text-primary">
                    Our Solution:
                  </h4>
                  <p className="text-text-secondary leading-relaxed">
                    {problemStatement.solution}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-text-primary">
                Google Cloud AI Integration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {googleCloudFeatures.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-primary mb-2">
                      {feature.service}
                    </h4>
                    <p className="text-sm text-text-secondary mb-3">
                      {feature.usage}
                    </p>
                    <p className="text-sm font-medium text-green-600">
                      {feature.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setDemoStep(2)}
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-lg"
              >
                Start Live Demo →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Voice Analysis Demo */}
        {demoStep === 2 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Step 1: AI-Powered Voice Analysis
              </h2>
              <p className="text-lg text-text-secondary">
                Powered by Google Cloud Speech-to-Text API + Vertex AI (Gemini)
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-6 text-text-primary">
                  Try the Voice Analysis Feature
                </h3>
                <p className="text-text-secondary mb-8">
                  Click the microphone and describe your craft business. The AI
                  will analyze your voice input and provide personalized
                  insights.
                </p>

                <VoiceRecorder onAnalysisComplete={handleAnalysisComplete} />

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Sample Input:
                  </h4>
                  <p className="text-blue-700 text-sm">
                    "I make traditional blue pottery in Jaipur. I've been doing
                    this for 15 years but struggle to reach customers online. My
                    products are unique but I don't know how to price them or
                    market them digitally."
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setDemoStep(1)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={() => setDemoStep(3)}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
              >
                Next: Product Upload →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Product Upload Demo */}
        {demoStep === 3 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Step 2: Smart Product Upload
              </h2>
              <p className="text-lg text-text-secondary">
                Powered by Google Cloud Vision AI + Vertex AI for categorization
                and pricing
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-6 text-text-primary">
                  AI-Powered Product Analysis
                </h3>
                <p className="text-text-secondary mb-8">
                  Upload craft photos and let Google Cloud Vision AI
                  automatically categorize your products and suggest optimal
                  pricing strategies.
                </p>

                <button
                  onClick={() => navigate("/marketplace")}
                  className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-lg"
                >
                  Try Product Upload Feature
                </button>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">👁️</div>
                    <h4 className="font-semibold text-green-800">Vision AI</h4>
                    <p className="text-green-700 text-sm">
                      Analyzes product images
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">🏷️</div>
                    <h4 className="font-semibold text-blue-800">
                      Auto-Categorization
                    </h4>
                    <p className="text-blue-700 text-sm">
                      Smart product classification
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">💰</div>
                    <h4 className="font-semibold text-purple-800">
                      Pricing Suggestions
                    </h4>
                    <p className="text-purple-700 text-sm">
                      AI-powered market analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setDemoStep(2)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={() => setDemoStep(4)}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
              >
                View Impact Results →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Social Impact */}
        {demoStep === 4 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Social Impact & Results
              </h2>
              <p className="text-lg text-text-secondary">
                Real-time metrics showing the positive impact on artisan
                communities
              </p>
            </div>

            <SocialImpactDashboard />

            {analysis && (
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-text-primary">
                  Your AI Analysis Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">
                      Business Type:
                    </h4>
                    <p className="text-text-secondary capitalize">
                      {analysis.businessType}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">
                      Business Stage:
                    </h4>
                    <p className="text-text-secondary capitalize">
                      {analysis.businessStage}
                    </p>
                  </div>
                </div>
                {analysis.quickWins && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-text-primary mb-3">
                      Quick Wins Identified:
                    </h4>
                    <ul className="space-y-2">
                      {analysis.quickWins.map((win, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span className="text-text-secondary">{win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => setDemoStep(1)}
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-lg"
              >
                Restart Demo
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HackathonDemo;
