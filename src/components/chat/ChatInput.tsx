import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 bg-black/40 border border-accent/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;