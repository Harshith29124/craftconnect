import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ variant = 'craftconnect' }) => {
  const location = useLocation();

  const getBrandInfo = () => {
    switch (variant) {
      case 'karigar':
        return { name: 'KarigarConnect', icon: 'ℹ️' };
      default:
        return { name: 'CraftConnect', icon: '🎨' };
    }
  };

  const brand = getBrandInfo();

  return (
    <header className="flex items-center justify-between px-4 sm:px-10 py-4 border-b border-border-color bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 text-primary text-2xl">{brand.icon}</div>
        <h1 className="text-xl font-bold text-text-primary">{brand.name}</h1>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className={`text-sm font-medium transition-colors ${
            location.pathname === '/' ? 'text-primary' : 'text-text-secondary hover:text-primary'
          }`}
        >
          Home
        </Link>
        <Link
          to="/upload"
          className={`text-sm font-medium transition-colors ${
            location.pathname === '/upload' ? 'text-primary' : 'text-text-secondary hover:text-primary'
          }`}
        >
          Marketplace
        </Link>
        <a href="#" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
          Resources
        </a>
        <a href="#" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
          Community
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
          🔔
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      </div>
    </header>
  );
};

export default Header;



