import React from 'react';
import { ChatMessage } from '../types';
import { RobotIcon } from './Icons';

interface AivyMessageProps {
  message: ChatMessage;
}

export const AivyMessage: React.FC<AivyMessageProps> = ({ message }) => {
  const isAi = message.role === 'ai';

  return (
    <div className={`flex w-full mb-4 ${isAi ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] ${isAi ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
          isAi 
            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' 
            : 'bg-gray-200 text-gray-500'
        }`}>
          {isAi ? <RobotIcon className="w-5 h-5" /> : <span className="text-xs font-bold">You</span>}
        </div>

        {/* Bubble */}
        <div className={`relative px-4 py-3 shadow-md text-sm leading-relaxed ${
          isAi 
            ? 'bg-white text-slate-700 rounded-2xl rounded-bl-none border border-slate-100' 
            : 'bg-blue-600 text-white rounded-2xl rounded-br-none'
        }`}>
          <div className="whitespace-pre-wrap font-normal">
            {message.content}
          </div>
          <div className={`text-[10px] mt-1 opacity-70 ${isAi ? 'text-slate-400' : 'text-blue-100 text-right'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

      </div>
    </div>
  );
};