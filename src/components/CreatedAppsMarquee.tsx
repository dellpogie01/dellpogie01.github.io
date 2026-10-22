import React from 'react';
import { portfolioApps } from '../data/appsData';
import { Smartphone, ExternalLink, Info } from 'lucide-react';
import { AppProject } from '../types';

interface CreatedAppsMarqueeProps {
  onSelectApp: (app: AppProject) => void;
  darkMode: boolean;
}

export const CreatedAppsMarquee: React.FC<CreatedAppsMarqueeProps> = ({ onSelectApp, darkMode }) => {
  return (
    <section id="apps" className={`py-20 relative overflow-hidden ${darkMode ? 'bg-[#07080c]' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs sm:text-sm font-medium">
          <Smartphone className="w-4 h-4" />
          <span>My Created Apps</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-['Great_Vibes',cursive] bg-gradient-to-r from-cyan-400 via-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-rainbow-text first-letter:text-5xl sm:first-letter:text-7xl">
          Android Applications & Games
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-light">
          Explore the collection of apps, utilities, and games crafted for Android devices.
        </p>
      </div>

      {/* Animated Marquee Container */}
      <div className="relative w-full flex overflow-x-hidden py-4">
        <div className="flex animate-marquee whitespace-nowrap gap-6 py-4 px-3">
          {portfolioApps.concat(portfolioApps).map((app, index) => (
            <div
              key={`${app.id}-${index}`}
              onClick={() => onSelectApp(app)}
              className={`w-80 flex-shrink-0 rounded-3xl border p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 shadow-xl ${
                darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className={`relative h-32 w-full bg-gradient-to-tr ${app.iconBg} rounded-2xl p-4 flex items-center justify-center mb-4 overflow-hidden`}>
                <div className="absolute top-2 right-2">
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-black/40 text-cyan-300 border border-cyan-500/30">
                    {app.category}
                  </span>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#090a0f] border-2 border-cyan-500/40 shadow-lg flex items-center justify-center font-mono text-2xl font-extrabold text-cyan-400">
                  {app.iconText}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1 truncate">{app.title}</h3>
              <p className="text-xs text-violet-400 mb-3 truncate">{app.subtitle}</p>
              <p className="text-xs text-slate-400 line-clamp-2 font-light">{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
