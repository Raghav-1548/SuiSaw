import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: number;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-accent' : 'bg-gray-700'
      }`}>
        {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
      </div>
      <div className={`flex-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-lg p-4 max-w-[80%] ${
          isUser 
            ? 'bg-accent text-white ml-auto' 
            : 'bg-gray-800 text-gray-100'
        }`}>
          <p className="whitespace-pre-wrap">{message}</p>
          <span className="text-xs opacity-70 mt-1 block">
            {new Date(timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;