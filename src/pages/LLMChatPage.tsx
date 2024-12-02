import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useModelStore } from '../store/modelStore';
import { useChatStore } from '../store/chatStore';
import { getChatResponse } from '../utils/gemini';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import { Bot, Loader2 } from 'lucide-react';

const LLMChatPage = () => {
  const { isAuthenticated } = useAuthStore();
  const { models } = useModelStore();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { initializeSession, addMessage, getCurrentSession } = useChatStore();

  // Get modelId from URL params
  const params = new URLSearchParams(location.search);
  const modelId = params.get('modelId');

  useEffect(() => {
    if (modelId) {
      const model = models.find(m => m.modelId === modelId);
      if (model?.systemInstructions) {
        initializeSession(modelId, model.systemInstructions);
      }
    }
  }, [modelId, models]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!modelId) {
    return <Navigate to="/featured" replace />;
  }

  const currentSession = getCurrentSession();
  const model = models.find(m => m.modelId === modelId);

  if (!model || !currentSession) {
    return <Navigate to="/featured" replace />;
  }

  const handleSendMessage = async (text: string) => {
    addMessage({
      text,
      isUser: true,
      timestamp: Date.now(),
    });

    setIsLoading(true);

    try {
      const response = await getChatResponse(text, currentSession.systemPrompt);
      addMessage({
        text: response,
        isUser: false,
        timestamp: Date.now(),
      });
    } catch (error) {
      addMessage({
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: Date.now(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <Bot className="w-8 h-8 text-accent" />
          <div>
            <h1 className="text-4xl font-bold text-accent">{model.modelName}</h1>
            <p className="text-gray-400 mt-1">
              Chat with your rented AI model
            </p>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-accent/10 h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {currentSession.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-accent">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI is thinking...</span>
              </div>
            )}
          </div>

          <div className="border-t border-accent/10 p-4">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLMChatPage;