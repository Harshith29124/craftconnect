import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import VoiceRecorder from '../components/VoiceRecorder';

const HomePage = () => {
  const [analysis, setAnalysis] = useState(null);
  const navigate = useNavigate();

  const handleAnalysisComplete = (analysisResult) => {
    setAnalysis(analysisResult);
    navigate('/insights', { state: { analysis: analysisResult } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg mx-auto text-center flex flex-col items-center">
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
        </div>
      </main>
    </div>
  );
};

export default HomePage;


