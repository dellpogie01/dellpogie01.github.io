import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MouseGravityParticles } from './components/MouseGravityParticles';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('juan_portfolio_theme');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('juan_portfolio_theme', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleExplore = () => {
    // Scroll to top or do nothing since sections below are removed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen relative flex flex-col justify-between transition-colors duration-300 bg-[#07080c]/60 backdrop-blur-[2px] ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      <MouseGravityParticles />

      <div className="flex-1 flex flex-col">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className="relative z-10 flex-1 flex items-center">
          <Hero onExplore={handleExplore} />
        </main>
      </div>
    </div>
  );
};
