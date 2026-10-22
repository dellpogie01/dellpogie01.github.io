import React from 'react';
import { Code, Github, Mail, Coffee, Wrench, FolderGit2, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  darkMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ darkMode }) => {
  return (
    <section id="about" className={`py-24 border-t ${darkMode ? 'bg-[#050608] border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-xl shadow-cyan-500/20 bg-gradient-to-tr from-cyan-500 to-violet-600 p-0.5 flex-shrink-0">
                <img 
                  src="/assets/aistudio/266930690008772_21c4b673.jpg" 
                  alt="Delio 'Dell' Labaddan Avatar"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/35 text-cyan-400 text-xs font-medium mb-2">
                  <Code className="w-3.5 h-3.5" />
                  <span>JuanMediaHubPH</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold">Delio "Dell" Labaddan</h3>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">🇵🇭 Independent Web and Android Developer</p>
                <p className="text-xs text-violet-400 font-mono mt-1 font-semibold italic">“A DOS era programmer. Still building.”</p>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Playfair_Display',serif]">
              Behind the Code
            </h2>

            <p className="text-slate-300 text-base font-light leading-relaxed">
              I’m an independent developer from the Philippines, turning everyday ideas into apps. My programming journey started in the DOS era. These days, I build with Kotlin, Java and Jetpack Compose, creating practical utilities, learning tools, and games that are easy to enjoy.
            </p>

            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Still curious. Still learning. Still building.
            </p>
          </div>

          <div className="lg:col-span-4 p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-cyan-400">
              <Coffee className="w-5 h-5" />
              <h4 className="font-bold text-base text-white">Coffee & Code</h4>
            </div>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              If you enjoy my apps and want to support what I build, a coffee is always appreciated.
            </p>
            {/* Coffee Cup Illustration Placeholder */}
            <div className="h-28 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-violet-600/20 border border-amber-500/30 flex items-center justify-center">
              <span className="text-4xl">☕</span>
            </div>
            <p className="text-[11px] text-slate-400 italic text-center font-mono">
              Built with curiosity, patience, and probably too much coffee.
            </p>
          </div>

        </div>

        {/* Detailed Subsections: How I Build & 2026 Recent Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          
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
                <p className="text-xs text-slate-400">I use Kotlin, Java, and Jetpack Compose to build apps that feel smooth and natural on any Android phone.</p>
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

          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-['Playfair_Display',serif]">2026 Recent Projects</h3>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/80 border border-dashed border-slate-700 text-center space-y-2">
                <Sparkles className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" />
                <h4 className="font-bold text-sm text-white">My Projects list</h4>
                <p className="text-xs text-slate-400 font-mono italic">Will provide later...</p>
              </div>
            </div>

            <div className="pt-4">
              <span className="text-xs text-slate-500 font-mono">JuanMediaHubPH / Delio Labaddan © {new Date().getFullYear()}</span>
            </div>
          </div>

        </div>

        {/* Let's Connect */}
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-['Playfair_Display',serif]">Let’s Connect</h3>
            <p className="text-sm text-slate-300 font-light">
              Have an idea, found a bug, or tried one of my apps? I’d love to hear from you.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-slate-300 font-light">
            <li className="flex items-center gap-3">
              <span className="text-cyan-400">💻</span>
              <span>Explore my repositories and see what I’m building.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-violet-400">🐛</span>
              <span>Open an issue to report a bug or suggest a feature.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-pink-400">⭐</span>
              <span>Star a project if it made your day a little easier.</span>
            </li>
          </ul>

          <div className="pt-4 flex items-center gap-4">
            <a
              href="https://github.com/dellpogie01"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-2 border border-slate-700"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>GitHub @dellpogie01</span>
            </a>
            <a
              href="mailto:juanmediahubph@gmail.com"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-2 border border-slate-700"
            >
              <Mail className="w-4 h-4 text-violet-400" />
              <span>juanmediahubph@gmail.com</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
