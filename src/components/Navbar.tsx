import React, { useState, useEffect } from 'react';
import { Code2 } from 'lucide-react';
import { AnimatedPhilippineFlag } from './AnimatedPhilippineFlag';

interface NavbarProps {
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 pointer-events-none ${
      isScrolled 
        ? 'bg-[#07080c]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-black/50' 
        : 'bg-[#07080c]/40 lg:bg-transparent backdrop-blur-[3px] lg:backdrop-blur-none border-b border-cyan-500/10 lg:border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-4 pb-2 flex items-center justify-between w-full pointer-events-none">
        
        {/* Brand Section: Only this block has pointer-events-auto */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-shrink-0 text-left pointer-events-auto">
          
          {/* User profile picture: Light purple border (responsive size) */}
          <div 
            onClick={scrollToTop}
            className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[72px] lg:h-[72px] rounded-xl border-2 border-purple-300/90 p-[1.5px] shadow-lg shadow-purple-500/25 flex-shrink-0 cursor-pointer overflow-hidden bg-slate-900/60"
            title="DELIO LABADDAN"
          >
            <img 
              src={`${import.meta.env.BASE_URL}profile.jpg?v=3`} 
              alt="DELIO LABADDAN" 
              className="w-full h-full object-cover object-top rounded-[10px]"
            />
          </div>

          <div className="flex flex-col text-left justify-center min-w-0">
            {/* Title: DELIO LABADDAN with GitHub button placed right to the right of it */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span 
                onClick={scrollToTop}
                className="font-extrabold text-base sm:text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent leading-tight cursor-pointer whitespace-nowrap"
              >
                DELIO LABADDAN
              </span>

              {/* GitHub Button moved right next to DELIO LABADDAN */}
              <a
                href="https://github.com/dellpogie01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-black font-semibold text-[11px] sm:text-xs shadow-md shadow-cyan-500/20 hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer whitespace-nowrap"
              >
                <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Subtitle: Same text color as "Discover..." */}
            <span 
              className="text-[11px] sm:text-xs lg:text-sm font-normal tracking-normal mt-0.5 bg-gradient-to-r from-cyan-300 via-pink-300 to-violet-300 bg-clip-text text-transparent"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              A DOS era programmer. Still building.
            </span>

            {/* Email link: Philippine flag + same rainbow gradient color */}
            <div className="mt-0.5 sm:mt-1 flex items-center">
              <a 
                href="mailto:juanmediahubph@gmail.com" 
                className="inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer group/email hover:opacity-90 transition-opacity min-w-0"
              >
                <AnimatedPhilippineFlag className="w-4 h-3 sm:w-5 sm:h-3.5 inline-block flex-shrink-0" />
                <span className="text-[11px] sm:text-xs lg:text-sm font-mono font-medium bg-gradient-to-r from-cyan-300 via-pink-300 to-violet-300 bg-clip-text text-transparent hover:underline truncate">
                  juanmediahubph@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Empty right area so the 3D Hero Phone occupies this top location and becomes bigger */}
      </div>
    </header>
  );
};
