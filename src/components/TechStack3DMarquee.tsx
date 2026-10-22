import React from 'react';
import { Code } from 'lucide-react';

interface TechStack3DMarqueeProps {
  darkMode: boolean;
}

export const TechStack3DMarquee: React.FC<TechStack3DMarqueeProps> = ({ darkMode }) => {
  // All mentioned programming languages and tools to be represented as 3D icons with NO text
  const techColors = [
    '#00f0ff', '#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#14b8a6',
    '#7f52ff', '#f89820', '#3178c6', '#ffd43b', '#00599c', '#ce422b', '#f05138', '#47a248',
    '#cc292b', '#f25022', '#ffb900', '#7fba00', '#00a4ef', '#0078d7', '#5c2d91', '#ff2800',
    '#00add8', '#264de4', '#2965f1', '#f7df1e', '#4479a1', '#4584b6', '#336791', '#007396',
    '#e34f26', '#1572b6', '#cc6699', '#777bb4', '#8892bf', '#007396', '#61dafb', '#b07219'
  ];

  // Generate 48 distinct 3D orb icons with no text
  const techOrbs = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    color: techColors[i % techColors.length],
    shadowColor: techColors[(i + 3) % techColors.length]
  }));

  return (
    <section id="tech-stack" className={`py-16 relative overflow-hidden ${darkMode ? 'bg-[#090a0f]/80' : 'bg-white/80'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/35 text-cyan-400 text-xs sm:text-sm font-medium">
          <Code className="w-4 h-4" />
          <span>Languages & Tech Stack (3D Icons)</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Playfair_Display',serif]">
          From DOS Era to Modern Stack
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-light">
          Continuous evolution across decades of programming languages and frameworks.
        </p>
      </div>

      {/* Continuous Marquee of 3D Spheres with No Text */}
      <div className="relative w-full flex overflow-x-hidden py-6">
        <div className="flex animate-marquee whitespace-nowrap gap-8 items-center px-4">
          {techOrbs.concat(techOrbs).map((orb, index) => (
            <div
              key={`${orb.id}-${index}`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex-shrink-0 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-125"
              style={{
                background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${orb.color} 50%, #090a0f 90%)`,
                boxShadow: `0 10px 25px -5px ${orb.color}88, inset 0 -8px 12px rgba(0,0,0,0.6), inset 0 4px 6px rgba(255,255,255,0.4)`
              }}
              title="3D Tech Orb"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
