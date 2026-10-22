import React from 'react';
import { Sun, Moon, Smartphone, Code2, LayoutDashboard, Grid, User, Sparkles, Mail } from 'lucide-react';

interface DashboardNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'apps', label: 'Apps Showcase', icon: <Grid className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'ai-studio', label: 'Juan AI Studio', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> }
  ];

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all ${
      darkMode 
        ? 'bg-[#090a0f]/90 border-cyan-500/20 shadow-lg shadow-cyan-950/20' 
        : 'bg-white/90 border-slate-200 shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${darkMode ? 'bg-[#090a0f]' : 'bg-white'}`}>
              <Smartphone className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-violet-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-text">
              JuanMediaHubPH
            </span>
            <span className="block text-[10px] font-mono tracking-widest text-cyan-500/80 uppercase">
              1-Pager Dashboard
            </span>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? darkMode 
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/20' 
                    : 'bg-cyan-50 text-cyan-600 border border-cyan-200 shadow-sm'
                  : darkMode
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className={`p-2.5 rounded-xl border transition-all ${
              darkMode 
                ? 'bg-slate-800/80 border-slate-700 text-yellow-400 hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <a
            href="https://github.com/dellpogie01"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-black font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:opacity-95 hover:scale-[1.02] transition-all"
          >
            <Code2 className="w-4 h-4 text-black" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Mobile Tab Bar (Bottom or Subheader) */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800 bg-slate-950/90 py-2.5 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === tab.id ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
