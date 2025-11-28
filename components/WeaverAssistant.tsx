import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/gemini';
import { ChatMessage } from '../types';
import { Send, Bot, X, MessageSquare } from 'lucide-react';

export const WeaverAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Greetings. I am the Weaver. How may I help you strengthen your financial fabric today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Prepare history for the service
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const stream = geminiService.streamResponse(userMessage, history);
      
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].text = fullResponse;
          return newHistory;
        });
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "The loom has snagged. Please try again.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-forest/10 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-forest p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-linen">
              <Bot size={20} />
              <h3 className="font-serif font-medium">The Weaver</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-linen/80 hover:text-linen transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-terra/30">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[85%] p-3 rounded-lg text-sm leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-indigo text-white rounded-br-none' 
                      : 'bg-white text-forest border border-forest/10 rounded-bl-none shadow-sm'}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-forest/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your finances..."
              className="flex-1 bg-terra/20 border border-forest/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-forest/40 text-forest placeholder:text-forest/40"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-goldenrod hover:bg-yellow-600 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-4 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2
          ${isOpen ? 'bg-forest text-white rotate-90 scale-0 opacity-0 absolute' : 'bg-forest text-white hover:bg-emerald-800 scale-100 opacity-100'}
        `}
      >
        <MessageSquare size={24} />
      </button>
      
      {!isOpen && (
        <button
           onClick={() => setIsOpen(true)}
           className="bg-forest hover:bg-emerald-800 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <Bot size={28} />
        </button>
      )}
    </div>
  );
};