import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import VoiceRecorder from '../components/VoiceRecorder';

const HomePage = () => {
  const [analysis, setAnalysis] = useState(null);
  const navigate = useNavigate();

  const handleAnalysisComplete = (analysisResult) => {
    setAnalysis(analysisResult);
    // Navigate to insights page with analysis data
    navigate('/insights', { state: { analysis: analysisResult } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary mb-4">
            How can I help you today?
          </h2>
          <p className="text-lg leading-8 text-text-secondary mb-10">
            Tap the microphone to speak about your business and get AI-powered insights.
          </p>
          
          <VoiceRecorder onAnalysisComplete={handleAnalysisComplete} />
          
          <p className="mt-6 text-sm text-text-secondary">
            CraftConnect Assistant is powered by AI. 
            <a className="font-semibold text-primary underline hover:text-primary-hover ml-1" href="#">
              Learn more
            </a>
          </p>

          {/* New Navigation Section */}
          <div className="mt-12 space-y-4">
            <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">
              Explore Our Platform
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <Link 
                to="/opportunities" 
                className="group flex flex-col items-center p-4 bg-white rounded-lg border border-border-color hover:border-primary hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                  📈
                </div>
                <span className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                  Growth Opportunities
                </span>
              </Link>

              <Link 
                to="/toolkit" 
                className="group flex flex-col items-center p-4 bg-white rounded-lg border border-border-color hover:border-primary hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                  🛠️
                </div>
                <span className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                  Artisan Toolkit
                </span>
              </Link>

              <Link 
                to="/marketplace" 
                className="group flex flex-col items-center p-4 bg-white rounded-lg border border-border-color hover:border-primary hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                  🏪
                </div>
                <span className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                  Upload Products
                </span>
              </Link>

              <Link 
                to="/insights" 
                className="group flex flex-col items-center p-4 bg-white rounded-lg border border-border-color hover:border-primary hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                  🧠
                </div>
                <span className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                  Business Insights
                </span>
              </Link>
            </div>
          </div>

          {/* Alternative Simple Button Layout */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/opportunities" 
              className="px-6 py-3 bg-white text-primary border border-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              Growth Opportunities
            </Link>
            <Link 
              to="/toolkit" 
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              Artisan Toolkit
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
