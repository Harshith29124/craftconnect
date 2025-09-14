import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const BusinessInsights = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis;

  if (!analysis) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">No Analysis Available</h2>
            <button onClick={() => navigate('/')} className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
              Start Voice Analysis
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">AI-Powered Business Analysis</h1>
          <p className="text-lg text-text-secondary">Powered by Google Cloud Speech-to-Text & Vertex AI, we've analyzed your craft business and identified personalized opportunities.</p>
          <div className="mt-4 flex justify-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Voice Analysis Complete
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              AI Insights Generated
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-text-primary">Business Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-text-secondary">Business Type:</span>
              <span className="ml-2 font-semibold text-text-primary capitalize">{analysis.businessType}</span>
            </div>
            <div>
              <span className="text-text-secondary">Stage:</span>
              <span className="ml-2 font-semibold text-text-primary capitalize">{analysis.businessStage}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-text-primary">Identified Problems</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(analysis.keyProblems || []).map((problem, index) => (
              <div key={index} className={`p-6 rounded-lg border-l-4 ${
                problem.severity === 'high' ? 'border-red-500 bg-red-50' :
                problem.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-green-500 bg-green-50'
              }`}>
                <h4 className="font-bold text-text-primary mb-2">{problem.problem}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary capitalize">{problem.category}</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    problem.severity === 'high' ? 'bg-red-200 text-red-800' :
                    problem.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {problem.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-text-primary">Recommended Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(analysis.actionablePlans || []).map((plan, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-border-color">
                <h4 className="font-bold text-text-primary mb-2">{plan.title}</h4>
                <p className="text-text-secondary mb-4">{plan.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(plan.tools || []).map((tool, toolIndex) => (
                    <span key={toolIndex} className="px-2 py-1 bg-secondary text-primary text-xs rounded">{tool}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Impact: {plan.estimatedImpact}</span>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors">Start This Plan</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {analysis.quickWins && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-text-primary">Quick Wins</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.quickWins.map((win, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-green-500">✅</span>
                  <span className="text-text-primary">{win}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-8">
          <button onClick={() => navigate('/')} className="bg-white text-primary px-6 py-3 rounded-lg font-semibold border border-primary hover:bg-secondary transition-colors">
            Analyze Again
          </button>
          <button onClick={() => navigate('/opportunities')} className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
            View Growth Opportunities
          </button>
        </div>
      </main>
    </div>
  );
};

export default BusinessInsights;



