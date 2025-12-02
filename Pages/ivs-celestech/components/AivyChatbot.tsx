
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Mic, StopCircle, Trash2 } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { ChatMessage, Language } from '../types';

interface Props {
  language: Language;
}

const AivyChatbot: React.FC<Props> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Welcome Message
  useEffect(() => {
    const welcomeText = language === 'vi' 
      ? 'Xin chào! Mình là Aivy 🤖. Mình có thể giúp gì cho dự án của bạn?' 
      : 'Hi there! I\'m Aivy 🤖. How can I help with your project?';
      
    setMessages([{
      id: 'welcome',
      role: 'model',
      text: welcomeText,
      timestamp: new Date()
    }]);
    
    // Reset session when language changes
    chatSessionRef.current = null;
  }, [language]);

  useEffect(() => {
    if (isOpen && !chatSessionRef.current) {
      chatSessionRef.current = createChatSession(language);
    }
    scrollToBottom();
  }, [isOpen, messages, language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessage({ message: userMsg.text });
        const text = result.text;
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: text,
          timestamp: new Date()
        }]);
      } else {
         // Fallback
         setTimeout(() => {
           setMessages(prev => [...prev, {
             id: (Date.now() + 1).toString(),
             role: 'model',
             text: language === 'vi' ? "Chế độ Demo: Vui lòng thêm API Key." : "Demo Mode: Please add API Key.",
             timestamp: new Date()
           }]);
         }, 1000);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: language === 'vi' ? "Mất kết nối. Thử lại sau nhé!" : "Connection lost. Try again later!",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Voice Handling
  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'vi' ? 'Trình duyệt không hỗ trợ giọng nói.' : 'Browser does not support voice.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'vi' ? 'vi-VN' : 'en-US';
    recognition.start();
    setIsRecording(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const clearChat = () => {
    setMessages([]);
    chatSessionRef.current = createChatSession(language);
  };

  return (
    <>
      {/* Trigger Button - Floating Aivy Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-50 p-0 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 p-[2px]">
             <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/20 to-purple-100/30 dark:via-blue-900/20 dark:to-purple-900/30"></div>
             </div>
          </div>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask Aivy
          </span>
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[90vw] md:w-[380px] h-[550px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800 font-sans">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
                 <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base">Aivy Assistant</h3>
                <p className="text-xs text-purple-100 opacity-90">{language === 'vi' ? 'Trực tuyến • Hỏi mọi thứ' : 'Online • Ask anything'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
               <button onClick={clearChat} className="p-2 hover:bg-white/20 rounded-full transition-colors" title="Clear Chat">
                  <Trash2 className="w-4 h-4 text-white/80" />
               </button>
               <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-black/20">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm relative ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-slate-700 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 dark:border-slate-700 shadow-sm flex gap-1.5 items-center">
                  <span className="text-xs text-gray-400 mr-1">Aivy is thinking</span>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
             <div className="relative flex items-center gap-2">
                <button 
                  onClick={startRecording}
                  disabled={isRecording}
                  className={`p-3 rounded-full transition-all duration-300 ${
                     isRecording 
                     ? 'bg-red-500 text-white animate-pulse' 
                     : 'bg-gray-100 dark:bg-slate-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                   {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={language === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...'}
                  className="flex-1 bg-gray-50 dark:bg-slate-800 border-0 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all outline-none dark:text-white dark:placeholder-gray-500"
                />
                
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:scale-90 shadow-md transform duration-200"
                >
                  <Send className="w-5 h-5" />
                </button>
             </div>
             <p className="text-[10px] text-center text-gray-400 mt-2">
                Powered by Gemini 2.5 • IVS Celestech
             </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AivyChatbot;
