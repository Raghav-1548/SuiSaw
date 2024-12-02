import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage, ChatSession } from '../types/chat';

interface ChatStore {
  sessions: Record<string, ChatSession>;
  currentSession: string | null;
  initializeSession: (modelId: string, systemPrompt: string) => void;
  addMessage: (message: Omit<ChatMessage, 'id'>) => void;
  getCurrentSession: () => ChatSession | null;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: {},
      currentSession: null,

      initializeSession: (modelId: string, systemPrompt: string) => {
        set((state) => ({
          sessions: {
            ...state.sessions,
            [modelId]: {
              modelId,
              systemPrompt,
              messages: [],
            },
          },
          currentSession: modelId,
        }));
      },

      addMessage: (message) => {
        const currentSession = get().currentSession;
        if (!currentSession) return;

        set((state) => ({
          sessions: {
            ...state.sessions,
            [currentSession]: {
              ...state.sessions[currentSession],
              messages: [
                ...state.sessions[currentSession].messages,
                { ...message, id: crypto.randomUUID() },
              ],
            },
          },
        }));
      },

      getCurrentSession: () => {
        const currentSession = get().currentSession;
        return currentSession ? get().sessions[currentSession] : null;
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);