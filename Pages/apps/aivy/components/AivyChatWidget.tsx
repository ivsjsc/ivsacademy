import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AivyService } from '../services/aivyService';
import { ChatMessage, AivyWidgetProps } from '../types';
import { AivyMessage } from './AivyMessage';
import { SendIcon, SparklesIcon, XIcon, RefreshIcon, MicrophoneIcon } from './Icons';

// Speech Recognition Type Definition
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const AivyChatWidget: React.FC<AivyWidgetProps> = ({
  apiUrl = '/api/ai-router',
  title = 'Aivy Assistant',
  greeting = 'Hello! I am Aivy. How can I help you today?',
  brandColor = 'indigo',
  enableVoice = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Create a service instance for this widget
  const aivyService = useMemo(() => new AivyService(apiUrl), [apiUrl]);

  // Voice Recognition Instance
  const recognition = useMemo(() => {
    if (typeof window !== 'undefined' && SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = 'en-US';
      rec.interimResults = false;
      return rec;
    }
    return null;
  }, []);

  // Initial Greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'init-1',
          role: 'ai',
          content: greeting,
          timestamp: Date.now()
        }
      ]);
    }
  }, [greeting]);

  // Auto-scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, isOpen]);

  // Handle Speech Events
  useEffect(() => {
    if (!recognition) return;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      // Optional: Auto-send after voice? Let's just fill input for now.
    };
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
  }, [recognition]);

  const toggleVoice = () => {
    if (!recognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // 1. Add User Message
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, newUserMsg]);

    try {
      // 2. Call Service
      const responseText = await aivyService.sendMessage(userText, 'en');

      // 3. Add AI Response
      const newAiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, newAiMsg]);

    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "Sorry, I encountered an error connecting to the server.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'ai',
        content: 'Chat cleared. What else is on your mind?',
        timestamp: Date.now()
      }
    ]);
  };

  // Dynamic classes for brand color
  const bgGradient = `bg-gradient-to-r from-${brandColor}-500 to-purple-600`;
  const bgGradientHeader = `bg-gradient-to-r from-${brandColor}-600 to-purple-600`;
  const buttonColor = `bg-${brandColor}-600 hover:bg-${brandColor}-700`;

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full ${bgGradient} text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group`}
          aria-label="Open Aivy Chat"
        >
          <SparklesIcon className="w-7 h-7 animate-pulse" />
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask Aivy
          </span>
        </button>
      )}

      {/* Main Chat Window */}
      <div 
        className={`fixed z-50 transition-all duration-300 ease-out origin-bottom-right shadow-2xl rounded-2xl overflow-hidden flex flex-col bg-white border border-slate-100 font-sans
        ${isOpen 
          ? 'bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] md:w-[380px] h-[500px] md:h-[600px] opacity-100 scale-100' 
          : 'bottom-6 right-6 w-0 h-0 opacity-0 scale-50 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className={`${bgGradientHeader} px-5 py-4 flex justify-between items-center text-white shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <SparklesIcon className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">{title}</h2>
              <p className="text-[10px] text-indigo-100 opacity-90">Powered by Aivy AI</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleClearChat}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white"
              title="Clear Chat"
            >
              <RefreshIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              title="Close"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-slate-50 overflow-y-auto p-4 custom-scrollbar">
          {messages.map((msg) => (
            <AivyMessage key={msg.id} message={msg} />
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
               <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
                 <div className="flex space-x-1.5 items-center h-4">
                   <div className={`w-1.5 h-1.5 bg-${brandColor}-400 rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
                   <div className={`w-1.5 h-1.5 bg-${brandColor}-400 rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
                   <div className={`w-1.5 h-1.5 bg-${brandColor}-400 rounded-full animate-bounce`}></div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <div className="relative flex items-center bg-slate-100 rounded-full border border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Aivy something..."
              className="flex-1 bg-transparent px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none min-w-0"
              disabled={isLoading}
            />
            
            {/* Voice Button */}
            {enableVoice && (
              <button 
                onClick={toggleVoice}
                className={`p-2 mr-1 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-slate-600'}`}
                title="Voice Input"
                disabled={isLoading}
              >
                <MicrophoneIcon className="w-5 h-5" />
              </button>
            )}

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={`mr-1.5 p-2 rounded-full text-white disabled:opacity-50 disabled:bg-slate-400 transition-colors shadow-sm ${buttonColor}`}
            >
              <SendIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 text-center">
            <p className="text-[10px] text-slate-400">AI responses can be inaccurate. Verify important info.</p>
          </div>
        </div>
      </div>
    </>
  );
};
