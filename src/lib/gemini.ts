import { GoogleGenerativeAI } from '@google/generative-ai';
import systemPrompt from '../../system-prompt.md?raw';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);

export const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  systemInstruction: systemPrompt,
});
