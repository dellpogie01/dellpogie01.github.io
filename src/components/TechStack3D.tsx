import React from 'react';

interface TechItem {
  name: string;
  category: 'dos-retro' | 'frontend' | 'backend' | 'database' | 'mobile' | 'tools';
  bgGradient: string;
  borderColor: string;
  shadowColor: string;
  renderIcon: () => React.ReactNode;
}

export const techStackData: TechItem[] = [
  // C / Borland / DOS Era
  {
    name: 'C',
    category: 'dos-retro',
    bgGradient: 'from-blue-600 via-indigo-700 to-slate-900',
    borderColor: 'border-blue-400/60',
    shadowColor: 'shadow-blue-500/30',
    renderIcon: () => <span className="font-black text-xs sm:text-sm text-white tracking-normal leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">C</span>
  },
  {
    name: 'Turbo C',
    category: 'dos-retro',
    bgGradient: 'from-sky-500 via-blue-700 to-indigo-950',
    borderColor: 'border-sky-300/60',
    shadowColor: 'shadow-sky-500/30',
    renderIcon: () => <span className="font-black text-[10.5px] sm:text-[11px] text-yellow-300 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">TC</span>
  },
  {
    name: 'Turbo C++',
    category: 'dos-retro',
    bgGradient: 'from-cyan-600 via-blue-800 to-indigo-950',
    borderColor: 'border-cyan-400/60',
    shadowColor: 'shadow-cyan-500/30',
    renderIcon: () => <span className="font-black text-[8.5px] sm:text-[9px] text-white tracking-tighter leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">TC++</span>
  },
  {
    name: 'Turbo Pascal',
    category: 'dos-retro',
    bgGradient: 'from-teal-500 via-emerald-700 to-slate-900',
    borderColor: 'border-teal-300/60',
    shadowColor: 'shadow-teal-500/30',
    renderIcon: () => <span className="font-black text-[10.5px] sm:text-[11px] text-amber-300 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">TP</span>
  },
  {
    name: 'Borland Delphi',
    category: 'dos-retro',
    bgGradient: 'from-red-600 via-rose-800 to-neutral-900',
    borderColor: 'border-rose-400/60',
    shadowColor: 'shadow-red-500/30',
    renderIcon: () => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-yellow-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.5l6.5 3.6v7.8L12 19.5 5.5 15.9V8.1L12 4.5z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  },
  {
    name: 'dBase III plus',
    category: 'dos-retro',
    bgGradient: 'from-amber-600 via-orange-800 to-stone-900',
    borderColor: 'border-amber-400/60',
    shadowColor: 'shadow-amber-500/30',
    renderIcon: () => <span className="font-mono font-black text-[9px] sm:text-[9.5px] text-white tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">dB3</span>
  },
  {
    name: 'Clipper',
    category: 'dos-retro',
    bgGradient: 'from-blue-700 via-slate-800 to-cyan-950',
    borderColor: 'border-blue-400/60',
    shadowColor: 'shadow-blue-500/30',
    renderIcon: () => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-cyan-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 18l8-14 8 14H4zm8-10.5L7.2 16h9.6L12 7.5z"/>
      </svg>
    )
  },
  {
    name: 'Basic',
    category: 'dos-retro',
    bgGradient: 'from-emerald-600 via-green-800 to-zinc-900',
    borderColor: 'border-emerald-400/60',
    shadowColor: 'shadow-emerald-500/30',
    renderIcon: () => <span className="font-mono font-black text-[9px] sm:text-[9.5px] text-emerald-200 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">BAS</span>
  },
  {
    name: 'FoxPro for DOS',
    category: 'dos-retro',
    bgGradient: 'from-orange-600 via-amber-800 to-stone-950',
    borderColor: 'border-orange-400/60',
    shadowColor: 'shadow-orange-500/30',
    renderIcon: () => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l4 8-4 4-4-4 4-8zm-8 12l4-2 4 4-6 6-2-8zm16 0l-4-2-4 4 6 6 2-8z"/>
      </svg>
    )
  },
  {
    name: 'HTML',
    category: 'frontend',
    bgGradient: 'from-orange-500 via-amber-600 to-red-700',
    borderColor: 'border-orange-300/60',
    shadowColor: 'shadow-orange-500/30',
    renderIcon: () => <span className="font-black text-[10px] sm:text-[11px] text-white tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">&lt;/&gt;</span>
  },
  {
    name: 'CSS',
    category: 'frontend',
    bgGradient: 'from-blue-500 via-sky-600 to-indigo-700',
    borderColor: 'border-sky-300/60',
    shadowColor: 'shadow-blue-500/30',
    renderIcon: () => <span className="font-black text-[9.5px] sm:text-[10px] text-white tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">#CSS</span>
  },
  {
    name: 'VBScript',
    category: 'backend',
    bgGradient: 'from-teal-600 via-cyan-800 to-slate-900',
    borderColor: 'border-teal-400/60',
    shadowColor: 'shadow-teal-500/30',
    renderIcon: () => <span className="font-mono font-bold text-[9px] sm:text-[9.5px] text-teal-200 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">VBS</span>
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    bgGradient: 'from-yellow-400 via-amber-500 to-yellow-600',
    borderColor: 'border-yellow-200/80',
    shadowColor: 'shadow-yellow-500/30',
    renderIcon: () => <span className="font-black text-[11px] sm:text-xs text-black tracking-tight leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">JS</span>
  },
  {
    name: 'SQL',
    category: 'database',
    bgGradient: 'from-sky-600 via-blue-800 to-indigo-900',
    borderColor: 'border-sky-400/60',
    shadowColor: 'shadow-sky-500/30',
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-4.97 0-9 1.79-9 4v10c0 2.21 4.03 4 9 4s9-1.79 9-4V7c0-2.21-4.03-4-9-4zm0 2c3.87 0 7 1.34 7 2s-3.13 2-7 2-7-1.34-7-2 3.13-2 7-2zm7 12c0 .66-3.13 2-7 2s-7-1.34-7-2v-2.14c1.94 1.31 4.49 2.14 7 2.14s5.06-.83 7-2.14V17zm0-5c0 .66-3.13 2-7 2s-7-1.34-7-2v-2.14c1.94 1.31 4.49 2.14 7 2.14s5.06-.83 7-2.14V12z"/>
      </svg>
    )
  },
  {
    name: 'VBA',
    category: 'backend',
    bgGradient: 'from-emerald-700 via-teal-800 to-green-950',
    borderColor: 'border-emerald-400/60',
    shadowColor: 'shadow-emerald-500/30',
    renderIcon: () => <span className="font-black text-[9px] sm:text-[10px] text-emerald-200 tracking-tighter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">VBA</span>
  },
  {
    name: 'SAS script',
    category: 'backend',
    bgGradient: 'from-blue-600 via-indigo-700 to-violet-900',
    borderColor: 'border-blue-400/60',
    shadowColor: 'shadow-blue-500/30',
    renderIcon: () => <span className="font-black text-[9px] sm:text-[10px] text-white tracking-tighter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">SAS</span>
  },
  {
    name: 'CoffeeScript',
    category: 'frontend',
    bgGradient: 'from-amber-800 via-stone-800 to-yellow-950',
    borderColor: 'border-amber-500/60',
    shadowColor: 'shadow-amber-500/30',
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 19h18v2H2zm18-14H6V3h14c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2zm0 2v3c0 1.1-.9 2-2 2H6V7h12zM4 5h2v10H4z"/>
      </svg>
    )
  },
  {
    name: 'Ivinex script',
    category: 'backend',
    bgGradient: 'from-purple-600 via-indigo-800 to-slate-900',
    borderColor: 'border-purple-400/60',
    shadowColor: 'shadow-purple-500/30',
    renderIcon: () => <span className="font-mono font-bold text-[9px] sm:text-[10px] text-purple-200 tracking-tighter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">IVX</span>
  },
  {
    name: 'Visual FoxPro',
    category: 'dos-retro',
    bgGradient: 'from-orange-500 via-red-700 to-amber-900',
    borderColor: 'border-orange-300/60',
    shadowColor: 'shadow-orange-500/30',
    renderIcon: () => <span className="font-black text-[9.5px] sm:text-[10px] text-yellow-300 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">VFP</span>
  },
  {
    name: 'Visual C++',
    category: 'backend',
    bgGradient: 'from-indigo-600 via-purple-700 to-blue-900',
    borderColor: 'border-indigo-400/60',
    shadowColor: 'shadow-indigo-500/30',
    renderIcon: () => <span className="font-black text-[8.5px] sm:text-[9px] text-cyan-300 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">VC++</span>
  },
  {
    name: 'Visual Basic 6',
    category: 'dos-retro',
    bgGradient: 'from-blue-600 via-yellow-600 to-indigo-900',
    borderColor: 'border-yellow-400/60',
    shadowColor: 'shadow-yellow-500/30',
    renderIcon: () => <span className="font-black text-[9.5px] sm:text-[10px] text-white tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">VB6</span>
  },
  {
    name: 'VB.NET',
    category: 'backend',
    bgGradient: 'from-blue-700 via-indigo-800 to-purple-900',
    borderColor: 'border-blue-400/60',
    shadowColor: 'shadow-blue-500/30',
    renderIcon: () => <span className="font-black text-[7px] sm:text-[7.5px] text-white tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">VB.NET</span>
  },
  {
    name: 'ADO.NET',
    category: 'database',
    bgGradient: 'from-cyan-700 via-blue-800 to-slate-900',
    borderColor: 'border-cyan-400/60',
    shadowColor: 'shadow-cyan-500/30',
    renderIcon: () => <span className="font-mono font-black text-[9.5px] sm:text-[10px] text-cyan-200 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">ADO</span>
  },
  {
    name: 'C#.NET',
    category: 'backend',
    bgGradient: 'from-purple-700 via-indigo-800 to-violet-950',
    borderColor: 'border-purple-400/60',
    shadowColor: 'shadow-purple-500/30',
    renderIcon: () => <span className="font-black text-[7px] sm:text-[7.5px] text-purple-200 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">C#.NET</span>
  },
  {
    name: 'React',
    category: 'frontend',
    bgGradient: 'from-cyan-500 via-slate-800 to-blue-950',
    borderColor: 'border-cyan-400/80',
    shadowColor: 'shadow-cyan-500/40',
    renderIcon: () => (
      <svg className="w-4 h-4 text-cyan-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/>
        <circle cx="12" cy="12" r="1.8" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Kotlin',
    category: 'mobile',
    bgGradient: 'from-purple-600 via-pink-600 to-orange-500',
    borderColor: 'border-pink-300/70',
    shadowColor: 'shadow-pink-500/30',
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="2,2 12,2 2,12"/>
        <polygon points="12,2 22,2 2,22 2,12"/>
        <polygon points="12,12 22,2 22,12 12,22"/>
      </svg>
    )
  },
  {
    name: 'XML',
    category: 'frontend',
    bgGradient: 'from-orange-600 via-teal-700 to-slate-900',
    borderColor: 'border-orange-400/60',
    shadowColor: 'shadow-orange-500/30',
    renderIcon: () => <span className="font-mono font-black text-[9.5px] sm:text-[10px] text-white tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">XML</span>
  },
  {
    name: 'JSON',
    category: 'frontend',
    bgGradient: 'from-amber-600 via-stone-800 to-zinc-950',
    borderColor: 'border-amber-400/60',
    shadowColor: 'shadow-amber-500/30',
    renderIcon: () => <span className="font-mono font-black text-[10px] sm:text-[11px] text-yellow-300 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">&#123; &#125;</span>
  },
  {
    name: 'Visual C#',
    category: 'backend',
    bgGradient: 'from-violet-700 via-purple-800 to-slate-900',
    borderColor: 'border-violet-400/60',
    shadowColor: 'shadow-violet-500/30',
    renderIcon: () => <span className="font-black text-[11px] sm:text-xs text-white tracking-normal leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">C#</span>
  },
  {
    name: 'Batch file',
    category: 'tools',
    bgGradient: 'from-neutral-800 via-stone-900 to-black',
    borderColor: 'border-emerald-500/50',
    shadowColor: 'shadow-emerald-500/20',
    renderIcon: () => <span className="font-mono font-black text-[9.5px] sm:text-[10px] text-emerald-400 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">&gt;_</span>
  },
  {
    name: 'PowerShell',
    category: 'tools',
    bgGradient: 'from-blue-800 via-indigo-900 to-black',
    borderColor: 'border-sky-400/60',
    shadowColor: 'shadow-sky-500/30',
    renderIcon: () => <span className="font-mono font-black text-[8.5px] sm:text-[9px] text-sky-300 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">&gt;PS</span>
  },
  {
    name: 'Jenkins',
    category: 'tools',
    bgGradient: 'from-slate-800 via-red-900 to-neutral-950',
    borderColor: 'border-red-400/60',
    shadowColor: 'shadow-red-500/30',
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="7" r="4"/>
        <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    category: 'tools',
    bgGradient: 'from-neutral-800 via-slate-900 to-black',
    borderColor: 'border-slate-500/60',
    shadowColor: 'shadow-cyan-500/20',
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    )
  },
  {
    name: 'Jira',
    category: 'tools',
    bgGradient: 'from-blue-600 via-sky-700 to-indigo-900',
    borderColor: 'border-blue-400/70',
    shadowColor: 'shadow-blue-500/30',
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.53 2c0 2.4 1.97 4.35 4.35 4.35h1.78v1.7c0 2.4 1.94 4.34 4.34 4.35V2.84a.84.84 0 0 0-.84-.84H11.53zM6.77 6.8c0 2.4 1.97 4.35 4.35 4.35h1.78v1.7c0 2.4 1.94 4.34 4.34 4.35V7.64a.84.84 0 0 0-.84-.84H6.77zM2 11.6c0 2.4 1.97 4.35 4.35 4.35h1.78v1.7c0 2.4 1.94 4.35 4.35 4.35v-9.56a.84.84 0 0 0-.84-.84H2z"/>
      </svg>
    )
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    bgGradient: 'from-sky-700 via-blue-800 to-indigo-950',
    borderColor: 'border-sky-300/60',
    shadowColor: 'shadow-sky-500/30',
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V19h-2v-2.07c-2.36-.26-4-1.74-4-3.93 0-1.77 1.06-3.21 2.74-3.71-.34-.72-.74-1.55-1.24-2.29.62-.25 1.29-.39 2-.46V5h2v1.54c.71.07 1.38.21 2 .46-.5.74-.9 1.57-1.24 2.29C13.94 9.79 15 11.23 15 13c0 2.19-1.64 3.67-4 3.93z"/>
      </svg>
    )
  },
  {
    name: 'MySQL',
    category: 'database',
    bgGradient: 'from-blue-600 via-amber-600 to-orange-800',
    borderColor: 'border-orange-400/60',
    shadowColor: 'shadow-orange-500/30',
    renderIcon: () => <span className="font-mono font-black text-[9px] sm:text-[9.5px] text-yellow-200 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">SQL</span>
  },
  {
    name: 'AuditStage Ascential',
    category: 'tools',
    bgGradient: 'from-amber-700 via-slate-800 to-cyan-950',
    borderColor: 'border-amber-400/60',
    shadowColor: 'shadow-amber-500/30',
    renderIcon: () => <span className="font-mono font-black text-[9px] sm:text-[9.5px] text-amber-200 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">ETL</span>
  },
  {
    name: 'Oracle Database',
    category: 'database',
    bgGradient: 'from-red-600 via-rose-800 to-neutral-900',
    borderColor: 'border-red-400/60',
    shadowColor: 'shadow-red-500/30',
    renderIcon: () => <span className="font-black text-[9px] sm:text-[9.5px] text-white tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">ORA</span>
  },
  {
    name: 'Java',
    category: 'backend',
    bgGradient: 'from-red-600 via-orange-600 to-blue-800',
    borderColor: 'border-red-400/60',
    shadowColor: 'shadow-red-500/30',
    renderIcon: () => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-cyan-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.1 19.8s-.6.5.4.7c1.3.2 2 .2 3.6-.2 1.3-.3 2.7-.8 2.7-.8s-.5.3-.8.4c-3.1 1.2-6.5.7-5.9-.1zm-1.5-2.5s-.7.6.4.7c1.5.2 2.6.2 4.9-.3 1.6-.3 3.3-1.1 3.3-1.1s-.6.4-1.1.6c-4 1.5-8.4 1-7.5-.2zm7.1-5.1c.6.7-.4 1.3-.4 1.3s1.2-.6.7-1.4c-.6-.9-1.7-1.3-2.6-2-2.1-1.6-1.1-3.6-1.1-3.6s-.3.9.7 1.8c1 1 2 1.5 2.7 3.9z"/>
      </svg>
    )
  },
  {
    name: 'Python',
    category: 'backend',
    bgGradient: 'from-blue-600 via-sky-700 to-yellow-500',
    borderColor: 'border-yellow-400/60',
    shadowColor: 'shadow-yellow-500/30',
    renderIcon: () => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-yellow-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 6 4.5 6 4.5V7h6V8H4S2 8 2 12.5 4 17 4 17h2v-2.5C6 13 7.5 13 7.5 13h5s3.5 0 3.5-3.5V4.5S16.5 2 12 2zm-1.5 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm1.5 18c5.52 0 6-2.5 6-2.5V17h-6v-1h8s2 0 2-4.5S20 7 20 7h-2v2.5c0 1.5-1.5 1.5-1.5 1.5h-5s-3.5 0-3.5 3.5V19.5S7.5 22 12 22zm1.5-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </svg>
    )
  },
  {
    name: 'SQLite',
    category: 'database',
    bgGradient: 'from-sky-700 via-blue-900 to-slate-900',
    borderColor: 'border-sky-400/60',
    shadowColor: 'shadow-sky-500/30',
    renderIcon: () => <span className="font-mono font-black text-[8px] sm:text-[8.5px] text-sky-200 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">LITE</span>
  },
  {
    name: 'Groovy',
    category: 'backend',
    bgGradient: 'from-cyan-600 via-blue-800 to-sky-950',
    borderColor: 'border-cyan-400/60',
    shadowColor: 'shadow-cyan-500/30',
    renderIcon: () => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-cyan-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    )
  },
  {
    name: 'GDScript',
    category: 'tools',
    bgGradient: 'from-sky-600 via-indigo-800 to-slate-900',
    borderColor: 'border-sky-400/60',
    shadowColor: 'shadow-sky-500/30',
    renderIcon: () => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-sky-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <rect x="4" y="6" width="16" height="12" rx="3"/>
        <circle cx="8.5" cy="11.5" r="1.5" fill="#000"/>
        <circle cx="15.5" cy="11.5" r="1.5" fill="#000"/>
      </svg>
    )
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    bgGradient: 'from-blue-600 via-blue-700 to-indigo-900',
    borderColor: 'border-blue-300/80',
    shadowColor: 'shadow-blue-500/30',
    renderIcon: () => <span className="font-black text-[10.5px] sm:text-[11px] text-white tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">TS</span>
  },
  {
    name: 'Dart',
    category: 'mobile',
    bgGradient: 'from-cyan-500 via-blue-600 to-teal-800',
    borderColor: 'border-cyan-300/70',
    shadowColor: 'shadow-cyan-500/30',
    renderIcon: () => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-cyan-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4l9-2 7 7-6 11-10-2z"/>
      </svg>
    )
  },
  {
    name: 'PHP',
    category: 'backend',
    bgGradient: 'from-indigo-600 via-purple-700 to-blue-900',
    borderColor: 'border-indigo-400/60',
    shadowColor: 'shadow-indigo-500/30',
    renderIcon: () => <span className="font-mono font-black text-[9px] sm:text-[9.5px] text-indigo-200 tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">PHP</span>
  },
  {
    name: 'ASP.NET',
    category: 'backend',
    bgGradient: 'from-blue-600 via-purple-700 to-indigo-900',
    borderColor: 'border-purple-400/60',
    shadowColor: 'shadow-purple-500/30',
    renderIcon: () => <span className="font-black text-[8.5px] sm:text-[9px] text-white tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">ASP</span>
  },
  {
    name: 'Android',
    category: 'mobile',
    bgGradient: 'from-emerald-500 via-green-600 to-teal-800',
    borderColor: 'border-emerald-300/80',
    shadowColor: 'shadow-emerald-500/40',
    renderIcon: () => (
      <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] overflow-visible" viewBox="0 0 24 24" fill="currentColor">
        {/* Complete Android: Head with Antennae & Eyes */}
        <path d="M15.56 5.5l1.3-1.3a.5.5 0 0 0-.7-.7l-1.39 1.39A7.05 7.05 0 0 0 12 4.5c-1 0-1.95.2-2.77.59L7.84 3.7a.5.5 0 0 0-.7.7l1.3 1.3A7.01 7.01 0 0 0 5 11h14a7.01 7.01 0 0 0-3.44-5.5zM9 9a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm6 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"/>
        {/* Torso & Legs */}
        <path d="M6 12v6.5c0 .55.45 1 1 1h1v3c0 .55.45 1 1 1s1-.45 1-1v-3h4v3c0 .55.45 1 1 1s1-.45 1-1v-3h1c.55 0 1-.45 1-1V12H6z"/>
        {/* Arms */}
        <path d="M3 12c-.55 0-1 .45-1 1v4.5c0 .55.45 1 1 1s1-.45 1-1V13c0-.55-.45-1-1-1zm18 0c-.55 0-1 .45-1 1v4.5c0 .55.45 1 1 1s1-.45 1-1V13c0-.55-.45-1-1-1z"/>
      </svg>
    )
  }
];

export const TechStack3DGrid: React.FC = () => {
  // Split exactly into four (4) rows as requested
  const chunkSize = Math.ceil(techStackData.length / 4);
  const row1 = techStackData.slice(0, chunkSize);
  const row2 = techStackData.slice(chunkSize, chunkSize * 2);
  const row3 = techStackData.slice(chunkSize * 2, chunkSize * 3);
  const row4 = techStackData.slice(chunkSize * 3);

  const renderIconItem = (tech: TechItem, idx: number) => (
    <div
      key={`${tech.name}-${idx}`}
      title={tech.name}
      className={`group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${tech.bgGradient} border ${tech.borderColor} p-1 flex items-center justify-center shadow-[0_3px_0_rgba(0,0,0,0.55),0_6px_12px_rgba(0,0,0,0.5),inset_0_1.5px_1.5px_rgba(255,255,255,0.45)] hover:border-cyan-300 hover:shadow-cyan-500/30 transition-colors duration-200 cursor-pointer select-none flex-shrink-0`}
    >
      {/* 3D Round Top Gloss Specular Highlight */}
      <div className="absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

      {/* 3D Center Emblem (clean centered, no scaling/clipping) */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-0.5 overflow-visible">
        {tech.renderIcon()}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-1.5 w-full pt-0.5">
      {/* Line 1 */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-0.5">
        {row1.map((tech, idx) => renderIconItem(tech, idx))}
      </div>
      {/* Line 2 */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-0.5">
        {row2.map((tech, idx) => renderIconItem(tech, idx + chunkSize))}
      </div>
      {/* Line 3 */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-0.5">
        {row3.map((tech, idx) => renderIconItem(tech, idx + chunkSize * 2))}
      </div>
      {/* Line 4 */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-0.5">
        {row4.map((tech, idx) => renderIconItem(tech, idx + chunkSize * 3))}
      </div>
    </div>
  );
};
