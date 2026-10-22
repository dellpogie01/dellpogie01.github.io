import React from 'react';
import { Smartphone, Github, Heart } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t py-12 ${darkMode ? 'bg-[#050608] border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-0.5 shadow-md">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${darkMode ? 'bg-[#07080c]' : 'bg-white'}`}>
                <Smartphone className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-base bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                JuanMediaHubPH
              </span>
              <p className="text-xs text-slate-500">Small Ideas. Meaningful Apps.</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-500 text-center md:text-left flex items-center gap-1.5">
            <span>© {currentYear} JuanMediaHubPH. Built with purpose & passion.</span>
          </div>

          {/* GitHub link */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/dellpogie01"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-slate-700/60"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};
