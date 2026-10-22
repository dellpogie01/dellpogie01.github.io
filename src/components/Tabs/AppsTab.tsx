import React, { useState, useMemo, useRef } from 'react';
import { AppProject, Category } from '../../types';
import { Search, ExternalLink, Info, AlertCircle, Smartphone, Gamepad2, BookOpen, Briefcase, Heart } from 'lucide-react';

interface AppsTabProps {
  apps: AppProject[];
  onSelectApp: (app: AppProject) => void;
  darkMode: boolean;
}

export const AppsTab: React.FC<AppsTabProps> = ({ apps, onSelectApp, darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = ['All', 'Education', 'Games', 'Productivity', 'Lifestyle'];

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
      const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            app.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [apps, selectedCategory, searchQuery]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 30, y: y * 30 });
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'Education': return <BookOpen className="w-4 h-4 text-amber-400" />;
      case 'Games': return <Gamepad2 className="w-4 h-4 text-cyan-400" />;
      case 'Productivity': return <Briefcase className="w-4 h-4 text-emerald-400" />;
      case 'Lifestyle': return <Heart className="w-4 h-4 text-pink-400" />;
      default: return <Smartphone className="w-4 h-4 text-violet-400" />;
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs sm:text-sm font-medium">
            <Smartphone className="w-4 h-4" />
            <span>App Portfolio Showcase</span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tight font-['Great_Vibes',cursive] bg-gradient-to-r from-cyan-400 via-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-rainbow-text first-letter:text-6xl sm:first-letter:text-8xl">
            Explore My Android Creations
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light">
            Browse through functional applications, educational tools, and games engineered for Android.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search apps or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                darkMode
                  ? 'bg-slate-900/80 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-black font-bold shadow-lg shadow-cyan-500/25'
                    : darkMode
                      ? 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredApps.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-slate-700/60">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-300">No apps found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApps.map((app, index) => {
              const depthFactor = (index % 3) + 1;
              const offsetX = mouseOffset.x * depthFactor * 0.15;
              const offsetY = mouseOffset.y * depthFactor * 0.15;

              return (
                <div
                  key={app.id}
                  style={{ transform: `translate3d(${offsetX}px, ${offsetY}px, 0)` }}
                  className={`group relative rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between overflow-hidden ${
                    darkMode
                      ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 hover:shadow-cyan-950/50'
                      : 'bg-white border-slate-200 hover:border-cyan-500/40 hover:shadow-cyan-100'
                  }`}
                >
                  <div className={`relative h-44 w-full bg-gradient-to-tr ${app.iconBg} p-6 flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/40 text-cyan-300 border border-cyan-500/30">
                        {app.publicationStatus}
                      </span>
                    </div>

                    <div className="relative z-10 w-24 h-24 rounded-3xl bg-[#090a0f] border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent tracking-widest font-mono">
                        {app.iconText}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(app.category)}
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">{app.category}</span>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight mb-1 group-hover:text-cyan-400 transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-xs font-medium text-violet-400 mb-3">{app.subtitle}</p>
                    <p className="text-sm text-slate-400 line-clamp-3 mb-6 font-light leading-relaxed">
                      {app.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                      {app.features.slice(0, 2).map((feat, idx) => (
                        <span key={idx} className={`text-[11px] px-2.5 py-1 rounded-md ${darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                          ✓ {feat}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
                      <button
                        onClick={() => onSelectApp(app)}
                        className="flex-1 py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
                      >
                        <Info className="w-4 h-4 text-cyan-400" />
                        <span>View Details</span>
                      </button>

                      {app.playStoreUrl ? (
                        <a
                          href={app.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/35 transition-all border border-cyan-500/30"
                          title="Get it on Google Play"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono italic px-2">
                          Listing soon
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
