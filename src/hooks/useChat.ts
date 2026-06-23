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
  text: '👋 ¡Hola! Soy CosapIA y voy a ayudarte a saber si calificas para un crédito.\nTe haré algunas preguntas rápidas sobre tu situación financiera.\n\n¿Comenzamos?\n• Sí, vamos\n• Tengo una duda primero',
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

  async function send(text: string) {
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', text }]);
    setLoading(true);

    try {
      const result = await getChat().sendMessage(text);
      setMessages(prev => [
        ...prev,
        { id: `m-${Date.now()}`, role: 'model', text: result.response.text() },
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
