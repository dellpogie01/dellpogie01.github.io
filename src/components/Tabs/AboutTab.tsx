import React from 'react';
import { Code, Github, Mail, Wrench, FolderGit2, Cpu, Layers, Terminal, Database, Smartphone } from 'lucide-react';

interface AboutTabProps {
  darkMode: boolean;
}

export const AboutTab: React.FC<AboutTabProps> = ({ darkMode }) => {
  const techStack = [
    { name: 'Kotlin', category: 'Language', icon: <Terminal className="w-5 h-5 text-cyan-400" /> },
    { name: 'Java', category: 'Language', icon: <Code className="w-5 h-5 text-amber-400" /> },
    { name: 'TypeScript', category: 'Language', icon: <Cpu className="w-5 h-5 text-blue-400" /> },
    { name: 'Python', category: 'Language', icon: <Terminal className="w-5 h-5 text-yellow-400" /> },
    { name: 'Jetpack Compose', category: 'UI Framework', icon: <Smartphone className="w-5 h-5 text-violet-400" /> },
    { name: 'Material Design 3', category: 'Design System', icon: <Layers className="w-5 h-5 text-pink-400" /> },
    { name: 'Android Studio', category: 'IDE & Tooling', icon: <Wrench className="w-5 h-5 text-emerald-400" /> },
    { name: 'SQLite / Room', category: 'Database', icon: <Database className="w-5 h-5 text-cyan-400" /> },
    { name: 'Git & GitHub', category: 'Version Control', icon: <Github className="w-5 h-5 text-white" /> }
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Top Profile Card & Tech Stack Badges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Story & Developer Avatar */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-xl shadow-cyan-500/20 bg-gradient-to-tr from-cyan-500 to-violet-600 p-0.5 flex-shrink-0">
              <img 
                src="/assets/aistudio/266930690008772_21c4b673.jpg" 
                alt="Delio 'Dell' Labaddan Avatar"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/35 text-cyan-400 text-xs font-medium mb-2">
                <Code className="w-3.5 h-3.5" />
                <span>About Developer</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Delio "Dell" Labaddan</h3>
              <p className="text-xs text-cyan-400 font-mono">Independent Web and Android Developer</p>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Playfair_Display',serif]">
            Building Android Apps for Everyday Life
          </h2>

          <p className="text-slate-300 text-base font-light leading-relaxed">
            Hi, I’m Dell, an independent Android developer from the Philippines. I create utilities for everyday tasks, learning apps for exploring something new, and games to enjoy in your spare time.
          </p>

          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Every project starts with a simple question: what could make someone’s day a little easier or more fun? That question guides the work, from the first sketch to the final release.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/dellpogie01"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-2 border border-slate-700"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>GitHub Profile</span>
            </a>
            <a
              href="mailto:juanmediahubph@gmail.com"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-2 border border-slate-700"
            >
              <Mail className="w-4 h-4 text-violet-400" />
              <span>Email Contact</span>
            </a>
          </div>
        </div>

        {/* Right Column: Clean Modern Card Badges Grid for Tech Stack */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Programming Languages & Tech Stack</h3>
              <p className="text-xs text-slate-400">Core technologies used in my Android and web projects.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {techStack.map((tech, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border transition-all hover:border-cyan-500/50 hover:-translate-y-1 flex items-center gap-3.5 ${
                  darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {tech.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{tech.name}</h4>
                  <span className="text-[11px] text-cyan-400 font-mono">{tech.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Detailed Biography Subsections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        
        {/* How I Build */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-['Playfair_Display',serif]">How I Build</h3>
          </div>

          <div className="space-y-4 text-sm text-slate-300 font-light leading-relaxed">
            <div>
              <strong className="text-cyan-400 block mb-1">Native Android development</strong>
              <p className="text-xs text-slate-400">I use Kotlin, Jetpack Compose, and Material 3 to build apps that feel smooth and natural on any Android phone.</p>
            </div>

            <div>
              <strong className="text-violet-400 block mb-1">Organized code</strong>
              <p className="text-xs text-slate-400">I keep different parts of the code clearly separated and use SQLite for local storage where needed, making projects easier to maintain and update.</p>
            </div>

            <div>
              <strong className="text-pink-400 block mb-1">Everyday usability</strong>
              <p className="text-xs text-slate-400">I aim for quick loading, reasonable app sizes, and offline access wherever it makes sense.</p>
            </div>

            <div>
              <strong className="text-emerald-400 block mb-1">Straightforward design</strong>
              <p className="text-xs text-slate-400">I focus on readable text, clear layouts, easy navigation, and animations that help explain what’s happening.</p>
            </div>
          </div>
        </div>

        {/* My Projects & Let's Connect */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-['Playfair_Display',serif]">My Projects</h3>
            </div>

            <p className="text-sm text-slate-300 font-light leading-relaxed">
              You’ll find a mix of practical tools, educational apps, and casual games here. Each project gives me a chance to try something new and improve on what I’ve learned.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
              “A DOS era programmer. Still building.” — Delio "Dell" Labaddan
            </div>
          </div>

          <div className="pt-4">
            <span className="text-xs text-slate-500 font-mono">JuanMediaHubPH / Delio Labaddan © {new Date().getFullYear()}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
