import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";
import { HERO_CONTENT, INTRO_CONTENT, SERVICES_CONTENT, PROCESS_STEPS, FAQ_ITEMS, SEGMENTS, COST_INFO } from '../constants';

const CONTEXT = `
Je bent de AI-assistent van Spontiva. Je helpt ondernemers met vragen over Time Gap Cashflow (TGC).
Gebruik onderstaande informatie als basis voor je antwoorden. Wees zakelijk, deskundig, behulpzaam en beknopt.

OVER SPONTIVA:
${HERO_CONTENT.titlePrimary} ${HERO_CONTENT.titleHighlight}. ${INTRO_CONTENT.text}
Voordelen: ${INTRO_CONTENT.benefits.join(', ')}.

DIENSTEN:
1. ${SERVICES_CONTENT.analysis.title}: ${SERVICES_CONTENT.analysis.description}
2. ${SERVICES_CONTENT.request.title}: ${SERVICES_CONTENT.request.description}

KOSTEN:
${COST_INFO.title}: ${COST_INFO.description}

FAQ:
${FAQ_ITEMS.map(f => `Vraag: ${f.question}\nAntwoord: ${f.answer}`).join('\n')}

Belangrijk: Verwijs bij concrete financieringsaanvragen altijd vriendelijk naar het contactformulier of info@spontiva.nl.
`;

const QUICK_CHIPS = [
  {
    label: "Hoe snel uitbetaald?",
    prompt: "Hoe snel kan het werkkapitaal op mijn rekening staan?",
    answer: "Na de gap-validatie staat het overeengekomen werkkapitaal doorgaans binnen 24 tot maximaal 48 uur direct op je zakelijke bankrekening."
  },
  {
    label: "Wat zijn de kosten?",
    prompt: "Wat kost een Time Gap Cashflow overbrugging?",
    answer: "Je betaalt een transparante vaste vergoeding vooraf op basis van het bedrag en de overbruggingsduur (bijv. 30 of 60 dagen). Er zijn geen afsluitkosten of verborgen provisies."
  },
  {
    label: "Verschil met banklening?",
    prompt: "Wat is het verschil met een traditionele banklening?",
    answer: "TGC is géén bankschuld op je balans en vereist geen persoonlijke borgtocht. Het is een flexibele procesoverbrugging die automatisch sluit zodra je opdrachtgever betaalt."
  }
];

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'init', 
      text: 'Welkom bij Spontiva. Heb je een vraag over werkkapitaal, onze 60+ TGC-methodes of een aanvraag? Ik help je direct op weg.', 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: CONTEXT,
          },
        });
        setChat(newChat);
      }
    } catch (error) {
      console.warn("Gemini Chat initialisatie overgeslagen; snelle FAQ antwoorden actief.");
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

  const handleChipClick = (chip: typeof QUICK_CHIPS[0]) => {
    const userMessage: Message = { id: Date.now().toString(), text: chip.prompt, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: chip.answer, sender: 'bot' }
      ]);
      setIsLoading(false);
    }, 400);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const query = input.trim();
    const userMessage: Message = { id: Date.now().toString(), text: query, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Check if matches known quick prompt
    const matchingChip = QUICK_CHIPS.find(c => 
      query.toLowerCase().includes('snel') || 
      query.toLowerCase().includes('kosten') || 
      query.toLowerCase().includes('lening') ||
      query.toLowerCase().includes('verschil')
    );

    if (!chat && matchingChip) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { id: (Date.now() + 1).toString(), text: matchingChip.answer, sender: 'bot' }
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    if (!chat) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { 
            id: (Date.now() + 1).toString(), 
            text: "Dank voor je vraag! Voor direct contact over jouw specifieke situatie kun je ons bereiken via info@spontiva.nl of direct een aanvraag indienen via het intakeformulier.", 
            sender: 'bot' 
          }
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const result = await chat.sendMessage({ message: query });
      const botResponse = result.text;
      
      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          text: botResponse || "Neem gerust contact op via info@spontiva.nl.", 
          sender: 'bot' 
        }
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: "Voor direct advies en antwoord op maat kun je ons bereiken op info@spontiva.nl of via het intakeformulier.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button with Safe Area */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 ${
          isOpen ? 'bg-slate-800 rotate-90' : 'bg-teal-600 hover:bg-teal-700'
        } text-white border border-white/20`}
        aria-label="Chat openen"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={26} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 left-4 sm:left-auto sm:bottom-28 sm:right-8 sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 z-50 transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
        style={{ height: '520px', maxHeight: '72vh' }}
      >
        {/* Header */}
        <div className="bg-slate-900 p-4.5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <MessageCircle size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm flex items-center gap-1.5">
                <span>Spontiva Assistent</span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              </h3>
              <p className="text-slate-400 text-[11px]">
                Directe Time Gap Cashflow hulp
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 text-xs sm:text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-teal-600 text-white font-medium rounded-br-none'
                    : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 text-slate-500 flex items-center gap-2 text-xs">
                <Loader2 size={13} className="animate-spin text-teal-600" />
                <span>Antwoord genereren...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3.5 py-2 bg-slate-100/90 border-t border-slate-200/60 flex gap-1.5 overflow-x-auto no-scrollbar">
          {QUICK_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip)}
              className="text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-300 px-2.5 py-1 rounded-full shrink-0 transition-colors"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Stel je vraag over werkkapitaal..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none focus:border-teal-500 focus:bg-white text-slate-900"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white rounded-xl transition-colors shadow-sm"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
