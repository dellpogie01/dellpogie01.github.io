import React from 'react';
import { Mail, Github, Sparkles, ArrowRight } from 'lucide-react';

interface ContactTabProps {
  darkMode: boolean;
}

export const ContactTab: React.FC<ContactTabProps> = ({ darkMode }) => {
  return (
    <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#07080c] to-slate-900 border border-cyan-500/30 p-8 sm:p-16 shadow-2xl text-center">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/35 text-cyan-400 text-xs sm:text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Let's Connect</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Playfair_Display',serif]">
            Get in Touch with Juan
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Explore my open-source repositories on GitHub, test out my Android apps, or reach out via email for inquiries, collaborations, or feedback.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://github.com/dellpogie01"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-black font-bold text-base shadow-xl shadow-cyan-500/25 hover:opacity-95 hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Github className="w-5 h-5 text-black" />
              <span>Visit GitHub Profile</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>

            <a
              href="mailto:juanmediahubph@gmail.com"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold text-base hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-3"
            >
              <Mail className="w-5 h-5 text-cyan-400" />
              <span>juanmediahubph@gmail.com</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
