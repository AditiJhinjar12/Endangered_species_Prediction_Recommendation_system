import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaRobot, FaCommentDots } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const EcoAIBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init-1',
      sender: 'bot',
      text: 'Hello! I am EcoBot, your wildlife research assistant. I can fetch species profiles, explain ML predictions, or help you compare species indicators. What can I help you analyze today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen to custom window event to toggle chatbot from Sidebar
  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-ecobot', handleToggle);
    return () => window.removeEventListener('toggle-ecobot', handleToggle);
  }, []);

  const quickPrompts = [
    { label: '🐯 Show Bengal Tiger data', text: 'Show me the research data summary for the Bengal Tiger.' },
    { label: '📊 Explain population prediction', text: 'How does the ML model forecast population trends?' },
    { label: '🔬 Compare Tiger and Rhino', text: 'Compare the Bengal Tiger and One-Horned Rhinoceros.' },
    { label: '💡 Explain recommendation rules', text: 'Explain the rules used to generate conservation recommendations.' },
  ];

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('tiger') || q.includes('bengal')) {
      return 'BENGAL TIGER (Panthera tigris tigris) SUMMARY:\n\n• Current Population: ~3,700 (Declining)\n• Major Threat: Habitat Loss (82% severity index) and Poaching (71% severity).\n• Status: Endangered\n• Interventions: Increase Habitat Protection (Priority: HIGH) and Anti-Poaching Patrols.\n\nYou can view the full profile under the "Species Explorer" tab.';
    }
    if (q.includes('compare') || q.includes('rhino') || q.includes('comparison')) {
      return 'SPECIES COMPARISON SUMMARY:\n\n• Bengal Tiger: Pop ~3,700 | Endangered | Declining Trend | High Poaching threat (71%).\n• One-Horned Rhino: Pop ~4,014 | Vulnerable | Stable Trend | Extreme Poaching threat (85%).\n\nFor a full side-by-side indicator matrix, navigate to the "Species Comparison" tab.';
    }
    if (q.includes('prediction') || q.includes('forecast') || q.includes('model') || q.includes('ml')) {
      return 'LSTM FORECAST MODEL EXPLANATION:\n\nEcoPredictAI uses recurrent neural networks trained on historical census logs (2016-2026) and local habitat variables. The model confidence is 91% for Tiger and 95% for Rhino datasets. Predictions project a 10-year curve (2028-2035) to help identify declining trends early. View these curves under the "Population Prediction" tab.';
    }
    if (q.includes('recommendation') || q.includes('rules') || q.includes('policy')) {
      return 'CONSERVATION RECOMMENDATION POLICY:\n\nOur recommendation engine uses data-driven trigger rules:\n1. If Habitat Loss severity > 60% and trend is declining → Trigger HIGH priority Habitat Restoration recommendation.\n2. If Poaching severity > 70% → Trigger HIGH priority Anti-Poaching patrols.\n\nRead the generated rules under the "Recommendations" tab.';
    }
    return "I can retrieve details for Bengal Tiger, Snow Leopard, Asian Elephant, and One-Horned Rhino, or explain how we process forecasts and comparison matrixes. Type 'tiger' or 'compare' to begin!";
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getAIResponse(textToSend);
      const botMessage: Message = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 850);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-['Poppins',sans-serif] text-left">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="w-80 sm:w-96 h-[500px] bg-[#020905]/95 border border-emerald-500/25 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-lg mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-950/70 to-emerald-900/60 p-4 border-b border-emerald-500/25 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30 text-brand-green">
                  <FaRobot className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">EcoBot AI</h3>
                  <span className="text-[10px] text-brand-green flex items-center gap-1 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-ping" />
                    Research Assistant Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-emerald-100/65 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-emerald-650 to-green-600 text-white rounded-tr-none'
                        : 'bg-emerald-950/45 border border-emerald-900/40 text-emerald-50 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[8px] text-right mt-1.5 opacity-60 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-emerald-950/45 border border-emerald-900/40 text-emerald-50 rounded-2xl rounded-tl-none px-3.5 py-3 shadow-sm flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Panel */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.text)}
                    className="text-[10px] font-semibold px-2.5 py-1.5 bg-emerald-950/30 hover:bg-emerald-950/70 border border-emerald-900/30 rounded-xl text-emerald-100/90 transition-colors cursor-pointer text-left"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-[#020905] border-t border-emerald-950/50 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about species, predictions, or metrics..."
                className="flex-1 bg-emerald-950/20 border border-emerald-900/30 rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-100/30 focus:outline-none focus:border-brand-green/45"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 bg-brand-green text-white hover:bg-brand-green-hover rounded-xl transition-all shadow-sm focus:outline-none disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
              >
                <FaPaperPlane className="h-3 w-3" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Icon */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer focus:outline-none relative border border-emerald-400/20"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FaTimes className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <FaCommentDots className="h-5.5 w-5.5" />
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
export default EcoAIBot;
