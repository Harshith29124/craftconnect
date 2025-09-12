import React from 'react';
import Header from '../components/Header';

const ArtisanToolkit = () => {
  const tools = [
    {
      title: "Build Your Digital Dukan",
      description: "Create a stunning online storefront to showcase your craft. We guide you through setup, inventory, and seamless order processing.",
      action: "Get Started",
      category: "Limited Online Presence",
      color: "bg-[#f8f5f1]",
      image: "🏪"
    },
    {
      title: "Targeted Marketing Campaigns",
      description: "Launch hyper-focused campaigns to attract customers who love your unique style. We'll help you pinpoint your audience and create ads that convert.",
      action: "Launch Campaign", 
      category: "Reaching New Customers",
      color: "bg-[#ffeee6]",
      image: "📱"
    },
    {
      title: "Craft Your Brand Kahani",
      description: "Share the heart behind your art. We'll help you create compelling content that forges a genuine connection with your audience.",
      action: "Share Story",
      category: "Telling Your Story", 
      color: "bg-[#f8f5f1]",
      image: "👩‍🎨"
    },
    {
      title: "Streamline Order Management",
      description: "Simplify your workflow with integrated tools. Track orders, manage shipping, and communicate with customers, all in one place.",
      action: "Manage Orders",
      category: "Managing Orders",
      color: "bg-[#fef0e8]",
      image: "📊"
    }
  ];

  return (
    <div className="bg-background min-h-screen" style={{fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'}}>
      <Header variant="kala" />

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-1 justify-center py-12">
        <div className="flex w-full max-w-6xl flex-col items-center">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold tracking-tighter text-text-primary mb-4">
              Your Artisan Toolkit
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl leading-relaxed">
              AI-powered solutions to elevate your craft and conquer the digital marketplace.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {tools.map((tool, index) => (
              <div key={index} className={`group flex flex-col gap-4 rounded-2xl ${tool.color} p-8 border border-border-color hover:border-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}>
                <div className="w-20 h-20 mb-6 text-4xl flex items-center justify-center bg-white/50 rounded-2xl shadow-inner">
                  {tool.image}
                </div>
                
                <div className="flex flex-col gap-2 flex-grow">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">{tool.category}</span>
                  <h3 className="text-2xl font-bold leading-tight text-text-primary mb-3">{tool.title}</h3>
                  <p className="text-text-secondary text-base leading-relaxed flex-grow">
                    {tool.description}
                  </p>
                </div>
                
                <button className="mt-6 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-wide hover:bg-primary-hover transition-colors duration-300 w-fit group-hover:scale-105">
                  <span className="truncate">{tool.action}</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtisanToolkit;
