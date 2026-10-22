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
    <header className="fixed top-0 left-0 right-0 z-30 pointer-events-none bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2 flex items-center justify-between w-full pointer-events-none">
        
        {/* Brand Section: Only this block has pointer-events-auto */}
        <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0 text-left pointer-events-auto">
          
          {/* User profile picture: Light purple border (resized to 3/4 size) */}
          <div 
            onClick={scrollToTop}
            className="w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-xl border-2 border-purple-300/90 p-[1.5px] shadow-lg shadow-purple-500/25 hover:scale-105 transition-transform flex-shrink-0 cursor-pointer overflow-hidden bg-slate-900/60"
            title="DELIO LABADDAN"
          >
            <img 
              src={`${import.meta.env.BASE_URL}profile.jpg?v=3`} 
              alt="DELIO LABADDAN" 
              className="w-full h-full object-cover object-top rounded-[10px]"
            />
          </div>

          <div className="flex flex-col text-left justify-center">
            {/* Title: DELIO LABADDAN with GitHub button placed right to the right of it */}
            <div className="flex items-center gap-3">
              <span 
                onClick={scrollToTop}
                className="font-extrabold text-lg sm:text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent animate-gradient-text leading-tight cursor-pointer"
              >
                DELIO LABADDAN
              </span>

              {/* GitHub Button moved right next to DELIO LABADDAN */}
              <a
                href="https://github.com/dellpogie01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-black font-semibold text-xs shadow-md shadow-cyan-500/20 hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-black" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Subtitle: Same text color and animation as "Discover..." (rainbow text gradient) */}
            <span 
              className="text-xs sm:text-sm font-normal tracking-normal mt-0.5 bg-gradient-to-r from-cyan-300 via-pink-300 to-violet-300 bg-clip-text text-transparent animate-rainbow-text"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              A DOS era programmer. Still building.
            </span>

            {/* Email link: Philippine flag + same rainbow gradient color & animation */}
            <div className="mt-1 flex items-center">
              <a 
                href="mailto:juanmediahubph@gmail.com" 
                className="inline-flex items-center gap-2 cursor-pointer group/email hover:opacity-90 transition-opacity"
              >
                <AnimatedPhilippineFlag className="w-5 h-3.5 inline-block group-hover/email:scale-110 transition-transform flex-shrink-0" />
                <span className="text-xs sm:text-sm font-mono font-medium bg-gradient-to-r from-cyan-300 via-pink-300 to-violet-300 bg-clip-text text-transparent animate-rainbow-text hover:underline">
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
