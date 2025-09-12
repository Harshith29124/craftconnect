import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ variant = 'craftconnect' }) => {
  const location = useLocation();

  const getBrandInfo = () => {
    switch (variant) {
      case 'karigar':
        return { 
          name: 'KarigarConnect', 
          icon: 'ℹ️',
          navItems: [
            { name: 'Home', path: '/' },
            { name: 'Stories', path: '#' },
            { name: 'Insights', path: '/insights' },
            { name: 'Tools', path: '/toolkit' }
          ]
        };
      case 'kala':
        return { 
          name: 'KalaConnect', 
          icon: '🎨',
          navItems: [
            { name: 'Home', path: '/' },
            { name: 'Marketplace', path: '/marketplace' },
            { name: 'Resources', path: '#' },
            { name: 'Community', path: '#' }
          ]
        };
      default:
        return { 
          name: 'CraftConnect', 
          icon: '🎨',
          navItems: [
            { name: 'Home', path: '/' },
            { name: 'Marketplace', path: '/marketplace' },
            { name: 'Resources', path: '#' },
            { name: 'Community', path: '#' }
          ]
        };
    }
  };

  const brand = getBrandInfo();

  return (
    <header className="flex items-center justify-between px-4 sm:px-10 py-4 border-b border-border-color bg-white/80 backdrop-blur-sm">
      <Link to="/" className="flex items-center gap-4">
        <div className="w-8 h-8 text-primary text-2xl">{brand.icon}</div>
        <h1 className="text-xl font-bold text-text-primary">{brand.name}</h1>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {brand.navItems.map((item) => (
          <Link 
            key={item.name}
            to={item.path}
            className={`text-sm font-medium transition-colors ${
              location.pathname === item.path 
                ? 'text-primary' 
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            {item.name}
          </Link>
        ))}
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
