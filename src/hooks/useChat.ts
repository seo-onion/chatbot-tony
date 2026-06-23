import { useState, useRef } from 'react';
import type { ChatSession } from '@google/generative-ai';
import { geminiModel } from '../lib/gemini';

export type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

const WELCOME: Message = {
  id: 'welcome',
  role: 'model',
  text: '🏠 ¡Hola! Soy CosapIA y voy a ayudarte a saber si calificas para un crédito hipotecario.\nTe haré algunas preguntas sobre el inmueble y tu situación financiera.\n\n¿Comenzamos?\n• Sí, vamos\n• Tengo una duda primero',
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<ChatSession | null>(null);

  function getChat(): ChatSession {
    if (!chatRef.current) {
      chatRef.current = geminiModel.startChat({ history: [] });
    }
    return chatRef.current;
  }

  async function sendWithRetry(text: string, attempts = 5): Promise<string> {
    for (let i = 0; i < attempts; i++) {
      try {
        const result = await getChat().sendMessage(text);
        return result.response.text();
      } catch (err: unknown) {
        const is503 = err instanceof Error && err.message.includes('503');
        if (is503 && i < attempts - 1) {
          await new Promise(res => setTimeout(res, 5000));
          continue;
        }
        throw err;
      }
    }
    throw new Error('Max retries reached');
  }

  async function send(text: string) {
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', text }]);
    setLoading(true);

    try {
      const reply = await sendWithRetry(text);
      setMessages(prev => [
        ...prev,
        { id: `m-${Date.now()}`, role: 'model', text: reply },
      ]);
    } catch (err) {
      console.error('[CosapIA] Gemini API error:', err);
      setMessages(prev => [
        ...prev,
        { id: `e-${Date.now()}`, role: 'model', text: 'Ocurrió un error. Por favor intenta nuevamente.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return { messages, loading, send };
}
