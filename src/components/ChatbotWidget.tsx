import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Minimize2,
  Maximize2,
  Bot,
  User,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

const N8N_WEBHOOK_URL = 'https://pottipooja07.app.n8n.cloud/webhook/ad722c42-f4dc-4c7b-a01b-a8bf821e4dc5/chat';

const QUICK_PROMPTS = [
  'Show Banarasi Sarees under ₹5,000',
  'Recommend Chikankari Kurtis',
  'What are the active discount codes?',
  'How do I track my order?',
  'Tell me about pure Katan silk care'
];

export const ChatbotWidget: React.FC = () => {
  const { setSelectedCategory, setIsOrderTrackingOpen } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  // Session ID for n8n webhook memory
  const [sessionId] = useState<string>(() => {
    try {
      const existing = localStorage.getItem('pf_chat_session_id');
      if (existing) return existing;
      const newId = `pf-sess-${Math.random().toString(36).substring(2, 11)}-${Date.now()}`;
      localStorage.setItem('pf_chat_session_id', newId);
      return newId;
    } catch {
      return `pf-sess-${Date.now()}`;
    }
  });

  // Chat message history
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('pf_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: 'Namaste! Welcome to **Pooja Fashion** — *Style That Feels Like You* ✨\n\nI am your personal styling concierge. How can I assist you today? You can ask me for saree recommendations, size guidance, bridal outfits, or our current festive promotions!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pf_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to save chat history', e);
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setHasUnread(false);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatInput: messageText,
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }

      const data = await response.json();
      const botReplyText =
        data.output ||
        data.text ||
        data.message ||
        data.response ||
        'Thank you for reaching out! Our stylists are at your service.';

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);

      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (error) {
      console.error('Error contacting n8n chatbot webhook:', error);
      const fallbackMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'I apologize, I am temporarily having trouble reaching the atelier server. You can also chat directly with our personal stylist on WhatsApp or browse our pure saree and kurti catalog below!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    const welcomeMsg: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'bot',
      text: 'Namaste! Fresh conversation started. How can I help you find your dream weave or festive outfit today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMsg]);
    try {
      localStorage.removeItem('pf_chat_history');
    } catch {
      // ignore
    }
  };

  // Helper to render markdown-like text
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    return (
      <div className="space-y-1 text-xs sm:text-[13px] leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();

          // Empty line
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Horizontal rule
          if (trimmed === '---') {
            return <hr key={idx} className="my-2 border-stone-200" />;
          }

          // Bullet points
          const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ');
          const lineContent = isBullet ? trimmed.replace(/^[\*\-•]\s+/, '') : trimmed;

          // Parse **bold** and *italic*
          const formatParts = (text: string) => {
            const parts = [];
            // Regex for **bold** and *italic*
            const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(text)) !== null) {
              if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
              }
              const m = match[0];
              if (m.startsWith('**') && m.endsWith('**')) {
                parts.push(
                  <strong key={match.index} className="font-semibold text-[#1A1818]">
                    {m.slice(2, -2)}
                  </strong>
                );
              } else if (m.startsWith('*') && m.endsWith('*')) {
                parts.push(
                  <em key={match.index} className="italic text-[#8C1D40]">
                    {m.slice(1, -1)}
                  </em>
                );
              }
              lastIndex = regex.lastIndex;
            }

            if (lastIndex < text.length) {
              parts.push(text.substring(lastIndex));
            }

            return parts;
          };

          if (isBullet) {
            return (
              <div key={idx} className="flex items-start gap-1.5 ml-1">
                <span className="text-[#8C1D40] font-bold text-xs leading-5">·</span>
                <span className="flex-1">{formatParts(lineContent)}</span>
              </div>
            );
          }

          return <p key={idx}>{formatParts(lineContent)}</p>;
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          aria-label="Open Pooja Fashion Stylist Chatbot"
          className="fixed bottom-6 right-6 z-40 bg-[#8C1D40] text-white p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#8C1D40] focus:ring-offset-2 border border-[#C5A059]/40"
        >
          <div className="relative">
            <Bot className="w-6 h-6 stroke-[1.75]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E8C5C8] border-2 border-[#8C1D40] animate-pulse" />
          </div>

          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2.5 text-xs font-semibold tracking-wide transition-all duration-300">
            Stylist Assistant
          </span>

          {hasUnread && (
            <span className="absolute -top-1 -left-1 bg-amber-400 text-[#1A1818] text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
              1
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[410px] bg-[#FDFBF7] rounded-xl shadow-2xl border border-[#DDD5C7] flex flex-col transition-all duration-300 overflow-hidden ${
            isMinimized ? 'h-14' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#1A1818] text-[#FDFBF7] px-4 py-3 flex items-center justify-between border-b border-[#C5A059]/30 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#8C1D40] flex items-center justify-center border border-[#C5A059]/60 shadow-inner">
                <Sparkles className="w-4 h-4 text-[#E8C5C8]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-sm font-medium text-white tracking-tight">
                    Pooja Stylist AI
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Online" />
                </div>
                <p className="text-[10px] text-[#EDE5DC]/70 font-sans">
                  Haute Weaves & Styling Concierge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#EDE5DC]/80">
              <button
                onClick={handleClearChat}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
                title={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message History */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF7F0]/60">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 text-xs shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-[#1A1818] text-[#FDFBF7] rounded-tr-none'
                          : 'bg-[#FDFBF7] text-[#2D2A29] border border-[#EAE3D9] rounded-tl-none'
                      }`}
                    >
                      {msg.sender === 'bot' ? (
                        renderFormattedText(msg.text)
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      )}
                    </div>
                    <span className="text-[9px] text-[#9E958E] mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-[#8C1D40] bg-[#FDFBF7] p-3 rounded-lg border border-[#EAE3D9] w-fit">
                    <span className="w-2 h-2 rounded-full bg-[#8C1D40] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#8C1D40] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-[#8C1D40] animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] text-[#7A736E] ml-1">Stylist is thinking...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Carousel */}
              <div className="px-3 py-2 bg-[#F2EDE4] border-t border-[#E5DDD0] flex gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading}
                    className="px-2.5 py-1 bg-white border border-[#DDD5C7] rounded-full text-[#4A4543] hover:text-[#8C1D40] hover:border-[#8C1D40] transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-[#FDFBF7] border-t border-[#EAE3D9] flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about sarees, sizing, offers..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 text-xs bg-[#F7F3EB] border border-[#DDD5C7] rounded-lg text-[#1A1818] placeholder-[#9E958E] focus:outline-none focus:border-[#8C1D40] transition-colors"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 bg-[#8C1D40] text-white rounded-lg hover:bg-[#68142E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Footer info */}
              <div className="px-3 py-1 bg-[#F7F3EB] text-[10px] text-[#9E958E] text-center border-t border-[#EAE3D9]/60 flex items-center justify-center gap-2">
                <span>Pooja Fashion AI Concierge</span>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setIsOrderTrackingOpen(true)}
                  className="text-[#8C1D40] hover:underline"
                >
                  Track Order
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
