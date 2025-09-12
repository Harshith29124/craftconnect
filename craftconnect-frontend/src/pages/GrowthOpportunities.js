import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const GrowthOpportunities = () => {
  const opportunities = [
    {
      title: 'Digital Dukan',
      description:
        "Your beautiful creations deserve a beautiful online home. Let's build a stunning digital storefront that reflects your unique style and attracts customers globally.",
      action: 'Build Your Store',
      color: 'bg-[#f8f5f1]',
      image: '🏪'
    },
    {
      title: 'Kahani & Marketing',
      description:
        "Every craft has a story. We'll help you tell yours through captivating content and smart marketing that connects with hearts and minds.",
      action: 'Share Your Story',
      color: 'bg-[#e8f5e8]',
      image: '📖'
    },
    {
      title: 'Smart Operations',
      description:
        'Spend more time creating, less time managing. Our tools automate sales, track inventory, and handle customer queries, so you can focus on your art.',
      action: 'Simplify Your Workflow',
      color: 'bg-[#fef0e8]',
      image: '⚙️'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header variant="karigar" />

      <main className="max-w-6xl mx-auto px-4 sm:px-10 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">OUR INSIGHTS</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-text-primary">Growth Opportunities for You</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            We've identified key areas where KarigarConnect can help you shine brighter and expand your craft's reach.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="space-y-16">
          {opportunities.map((opportunity, index) => (
            <div
              key={index}
              className={`${opportunity.color} rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              } group hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-text-primary">{opportunity.title}</h2>
                <p className="text-lg text-text-secondary mb-6 leading-relaxed">{opportunity.description}</p>
                <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors flex items-center gap-2 mx-auto lg:mx-0 group-hover:scale-105">
                  {opportunity.action}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
              <div className="flex-shrink-0">
                <div className="w-64 h-48 bg-white/50 rounded-2xl flex items-center justify-center text-6xl shadow-inner hover:shadow-md transition-shadow">
                  {opportunity.image}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border-color">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-secondary">
              © 2024 KarigarConnect. Made with ❤️ for artisans.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-lg text-text-secondary hover:text-primary transition-colors">📘</a>
              <a href="#" className="text-lg text-text-secondary hover:text-primary transition-colors">📷</a>
              <a href="#" className="text-lg text-text-secondary hover:text-primary transition-colors">✕</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default GrowthOpportunities;
