import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAGV9MzjVg6Q3oR0jfrpmT7utuFdowH1Z0';
const genAI = new GoogleGenerativeAI(API_KEY);

export const getChatResponse = async (message: string, systemPrompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-002' });
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // First, send the system prompt to set the context
    await chat.sendMessage(systemPrompt);
    
    // Then send the user's message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting chat response:', error);
    throw error;
  }
};