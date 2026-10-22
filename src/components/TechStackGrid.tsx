import React from 'react';
import { Code, Cpu, Layers, Terminal, Database, Smartphone, Wrench, Github } from 'lucide-react';

interface TechStackGridProps {
  darkMode: boolean;
}

export const TechStackGrid: React.FC<TechStackGridProps> = ({ darkMode }) => {
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
    <section id="tech-stack" className={`py-20 relative ${darkMode ? 'bg-[#090a0f]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/35 text-cyan-400 text-xs sm:text-sm font-medium">
            <Code className="w-4 h-4" />
            <span>Programming Languages & Tech Stack</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-['Playfair_Display',serif]">
            Tech Stack & Tools
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light">
            Core programming languages and engineering tools powering my Android and web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl border transition-all hover:border-cyan-500/50 hover:-translate-y-1.5 shadow-xl flex items-center gap-4 ${
                darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0">
                {tech.icon}
              </div>
              <div>
                <h4 className="font-bold text-base text-white">{tech.name}</h4>
                <span className="text-xs text-cyan-400 font-mono">{tech.category}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
