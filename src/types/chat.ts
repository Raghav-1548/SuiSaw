import { z } from 'zod';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

export interface ChatSession {
  modelId: string;
  systemPrompt: string;
  messages: ChatMessage[];
}

export const chatSchema = z.object({
  modelId: z.string().min(1, 'Model ID is required'),
  systemPrompt: z.string().min(1, 'System prompt is required'),
});