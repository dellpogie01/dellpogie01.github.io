import React, { useState } from 'react';
import { ChatMessage, AiGeneratorState } from '../../types';
import { sendChatMessage, generateAiConcept } from '../../utils/gemini';
import { Sparkles, Send, Bot, User, Brain, Image as ImageIcon, Loader2 } from 'lucide-react';

interface AiStudioTabProps {
  darkMode: boolean;
}

export const AiStudioTab: React.FC<AiStudioTabProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'media'>('chat');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! I am Juan AI Assistant. Ask me anything about JuanMediaHubPH’s Android apps, tech stack, or request an AI-generated app concept!',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [useThinking, setUseThinking] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const [generatorState, setGeneratorState] = useState<AiGeneratorState>({
    prompt: '',
    isGenerating: false,
    resultUrl: null,
    mode: 'image',
    error: null
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsChatLoading(true);

    try {
      const replyText = await sendChatMessage([...messages, userMsg], useThinking);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Sorry, I encountered an error connecting to Gemini. Please check your API key in the AI Studio Secrets panel.',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatorState.prompt.trim() || generatorState.isGenerating) return;

    setGeneratorState((prev) => ({ ...prev, isGenerating: true, error: null }));

    try {
      const resultText = await generateAiConcept(generatorState.prompt);
      setGeneratorState((prev) => ({
        ...prev,
        isGenerating: false,
        resultUrl: resultText
      }));
    } catch (err: any) {
      setGeneratorState((prev) => ({
        ...prev,
        isGenerating: false,
        error: err.message || 'Generation failed.'
      }));
    }
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/35 text-cyan-400 text-xs sm:text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>Juan AI Studio</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-['Playfair_Display',serif]">
          Interactive AI Developer Assistant
        </h2>
        <p className="text-slate-400 text-base">
          Chat with Gemini about Juan’s apps, enable high thinking mode, or generate AI concept art for future Android projects.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-black shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Juan AI Chatbot</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'media'
                ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-black shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>AI Concept Studio</span>
          </button>
        </div>
      </div>

      {activeTab === 'chat' && (
        <div className="rounded-3xl border bg-slate-900/90 border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[520px]">
          
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-black font-bold">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Juan AI Assistant</h3>
                <p className="text-xs text-cyan-400 font-mono">Powered by Gemini ({useThinking ? 'gemini-4-argon with High Thinking' : 'gemini-3.8-flash'})</p>
              </div>
            </div>

            <button
              onClick={() => setUseThinking(!useThinking)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                useThinking 
                  ? 'bg-violet-500/20 border-violet-500/50 text-violet-300 shadow-lg shadow-violet-950/50' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Brain className={`w-4 h-4 ${useThinking ? 'text-violet-400 animate-pulse' : ''}`} />
              <span>High Thinking Mode</span>
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user' ? 'bg-violet-600 text-white' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}>
                  {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-violet-600 text-white rounded-tr-none'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none font-light'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isChatLoading && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/90 text-slate-400 border border-slate-700 text-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Gemini is thinking...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 flex items-center gap-3">
            <input
              type="text"
              placeholder="Ask about Juan's apps, features, or Android tech stack..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-cyan-500 outline-none"
            />
            <button
              type="submit"
              disabled={isChatLoading || !inputMessage.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-black font-bold text-sm shadow-lg shadow-cyan-500/25 hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              <span>Send</span>
              <Send className="w-4 h-4 text-black" />
            </button>
          </form>

        </div>
      )}

      {activeTab === 'media' && (
        <div className="rounded-3xl border bg-slate-900/90 border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">AI App Concept & Asset Generator</h3>
            <p className="text-sm text-slate-400 font-light">
              Describe an app feature, icon, or UI screen, and let Gemini generate a detailed design specification or visual concept.
            </p>
          </div>

          <form onSubmit={handleGenerateMedia} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">Concept Prompt</label>
              <textarea
                rows={3}
                placeholder="e.g. A cyberpunk neon dark mode dashboard for a medication alarm app with pill counters..."
                value={generatorState.prompt}
                onChange={(e) => setGeneratorState({ ...generatorState, prompt: e.target.value })}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-cyan-500 outline-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Powered by Gemini Multimodal</span>
              <button
                type="submit"
                disabled={generatorState.isGenerating || !generatorState.prompt.trim()}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-black font-bold text-sm shadow-lg shadow-cyan-500/25 hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {generatorState.isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Generating Concept...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Generate AI Concept</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {generatorState.error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
              {generatorState.error}
            </div>
          )}

          {generatorState.resultUrl && (
            <div className="mt-6 p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Generated Design Concept</span>
                <span className="text-xs text-slate-500 font-mono">Gemini AI Output</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-light leading-relaxed whitespace-pre-wrap">
                {generatorState.resultUrl}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
