import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";
import { HERO_CONTENT, INTRO_CONTENT, SERVICES_CONTENT, PROCESS_STEPS, FAQ_ITEMS, SEGMENTS, COST_INFO } from '../constants';

// Construct context from constants for the system instruction
const CONTEXT = `
Je bent de AI-assistent van Spontiva. Je helpt bezoekers met vragen over Time Gap Cashflow (TGC).
Gebruik onderstaande informatie als basis voor je antwoorden. Wees beleefd, professioneel en beknopt.

OVER SPONTIVA:
${HERO_CONTENT.title}. ${INTRO_CONTENT.text}
Voordelen: ${INTRO_CONTENT.benefits.join(', ')}.

DIENSTEN:
1. ${SERVICES_CONTENT.analysis.title}: ${SERVICES_CONTENT.analysis.description}
   Voordeel: ${SERVICES_CONTENT.analysis.benefit}
   Resultaat: ${SERVICES_CONTENT.analysis.outcome}
2. ${SERVICES_CONTENT.request.title}: ${SERVICES_CONTENT.request.description}
   Voordeel: ${SERVICES_CONTENT.request.benefit}
   Resultaat: ${SERVICES_CONTENT.request.outcome}

WERKWIJZE:
${PROCESS_STEPS.map(s => `Stap ${s.number}: ${s.title} - ${s.description}`).join('\n')}

DOELGROEPEN:
${SEGMENTS.map(s => `- ${s.title}: ${s.description} (${s.useCase})`).join('\n')}

KOSTEN:
${COST_INFO.title}: ${COST_INFO.description}
${COST_INFO.disclaimer}

FAQ:
${FAQ_ITEMS.map(f => `Vraag: ${f.question}\nAntwoord: ${f.answer}`).join('\n')}

Belangrijk: Je geeft geen financieel advies, maar informeert over de diensten van Spontiva. Verwijs bij specifieke aanvragen naar het contactformulier.
`;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', text: 'Welkom bij Spontiva! Ik ben uw virtuele assistent. Waarmee kan ik u helpen?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Gemini Chat
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const newChat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: CONTEXT,
        },
      });
      setChat(newChat);
    } catch (error) {
      console.error("Failed to initialize chat:", error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !chat) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessage({ message: userMessage.text });
      const botResponse = result.text;
      
      const botMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        text: botResponse || "Excuus, ik begreep dat niet goed.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: "Er is een fout opgetreden. Probeer het later opnieuw.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
          isOpen ? 'bg-slate-700 rotate-90' : 'bg-teal-600 hover:bg-teal-700'
        } text-white`}
        aria-label="Chat openen"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-4 left-4 sm:left-auto sm:bottom-24 sm:right-6 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-[60] transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '70vh' }}
      >
        {/* Header */}
        <div className="bg-slate-900 p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <MessageCircle size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Spontiva Assistent</h3>
              <p className="text-slate-400 text-xs flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-teal-600 text-white rounded-br-none'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                <span className="text-xs text-slate-500">Aan het typen...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Stel uw vraag..."
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder-slate-400 text-sm transition-shadow"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-2 p-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
          <div className="mt-2 text-center">
             <p className="text-[10px] text-slate-400">Powered by Google Gemini</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;