import React, { useState, useEffect } from 'react';
import { AppProject } from '../types';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, Smartphone, CheckCircle, Calendar, Tag, ShieldCheck } from 'lucide-react';

interface AppModalProps {
  app: AppProject | null;
  onClose: () => void;
  darkMode: boolean;
}

export const AppModal: React.FC<AppModalProps> = ({ app, onClose, darkMode }) => {
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && app) {
        setActiveScreenshotIdx((prev) => (prev + 1) % app.screenshots.length);
      }
      if (e.key === 'ArrowLeft' && app) {
        setActiveScreenshotIdx((prev) => (prev - 1 + app.screenshots.length) % app.screenshots.length);
      }
    };

    if (app) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [app, onClose]);

  if (!app) return null;

  const nextScreenshot = () => {
    setActiveScreenshotIdx((prev) => (prev + 1) % app.screenshots.length);
  };

  const prevScreenshot = () => {
    setActiveScreenshotIdx((prev) => (prev - 1 + app.screenshots.length) % app.screenshots.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          darkMode ? 'bg-[#0b0c10] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className={`h-2 w-full bg-gradient-to-r ${app.iconBg}`} />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-slate-800/60">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${app.iconBg} p-0.5 shadow-lg flex-shrink-0`}>
              <div className="w-full h-full rounded-[14px] bg-[#090a0f] flex items-center justify-center font-extrabold text-white text-xl">
                {app.iconText}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{app.title}</h2>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {app.publicationStatus}
                </span>
              </div>
              <p className="text-sm font-medium text-violet-400 mt-1">{app.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                <span>Category</span>
              </div>
              <div className="font-bold text-sm">{app.category}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Smartphone className="w-3.5 h-3.5 text-violet-400" />
                <span>Version</span>
              </div>
              <div className="font-bold text-sm font-mono">{app.version || '1.0.0'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Calendar className="w-3.5 h-3.5 text-pink-400" />
                <span>Released</span>
              </div>
              <div className="font-bold text-sm font-mono">{app.releaseDate || '2025'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Privacy</span>
              </div>
              <div className="font-bold text-sm">100% Offline</div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold tracking-tight">About this App</h3>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              {app.longDescription}
            </p>
          </div>

          {/* Screenshot Carousel */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight">App Screenshots & Previews</h3>
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-[#07080c] border border-slate-800 h-64 sm:h-80 flex items-center justify-center group">
              
              {/* Carousel Content */}
              <div className="text-center px-6 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 font-mono text-xl font-extrabold">
                  {activeScreenshotIdx + 1}
                </div>
                <h4 className="text-xl font-bold tracking-tight text-white">
                  {app.screenshots[activeScreenshotIdx]}
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Illustrative UI Preview — {activeScreenshotIdx + 1} of {app.screenshots.length}
                </p>
              </div>

              {/* Prev / Next Controls */}
              <button
                onClick={prevScreenshot}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-black text-white border border-slate-700 transition-all shadow-lg"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextScreenshot}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-black text-white border border-slate-700 transition-all shadow-lg"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {app.screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveScreenshotIdx(idx)}
                    className={`h-2 rounded-full transition-all ${idx === activeScreenshotIdx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700'}`}
                    aria-label={`Go to screenshot ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {app.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 sm:p-8 pt-4 border-t border-slate-800/60 bg-slate-950/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {app.sourceCodeUrl && (
              <a
                href={app.sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2 border border-slate-700"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            {app.playStoreUrl ? (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-black font-bold text-sm shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-black" />
                <span>Get it on Google Play</span>
              </a>
            ) : (
              <div className="text-xs text-slate-400 font-mono px-4 py-3 rounded-xl bg-slate-900 border border-slate-800">
                Google Play Listing: <span className="text-amber-400">Add publication status</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
