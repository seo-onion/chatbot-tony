import { useState } from 'react';
import { groq, GROQ_MODEL } from '../lib/groq';
import systemPrompt from '../../system-prompt.md?raw';

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

  async function sendWithRetry(
    chatHistory: { role: 'system' | 'user' | 'assistant'; content: string }[],
    attempts = 5
  ): Promise<string> {
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await groq.chat.completions.create({
          messages: chatHistory,
          model: GROQ_MODEL,
        });
        return response.choices[0]?.message?.content || '';
      } catch (err: unknown) {
        const isTransient = err instanceof Error && (err.message.includes('503') || err.message.includes('429'));
        if (isTransient && i < attempts - 1) {
          await new Promise(res => setTimeout(res, 5000));
          continue;
        }
        throw err;
      }
    }
    throw new Error('Max retries reached');
  }

  async function send(text: string) {
    const newUserMessage: Message = { id: `u-${Date.now()}`, role: 'user', text };
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const chatHistory = [
        { role: 'system' as const, content: systemPrompt },
        ...messages.map(m => ({
          role: m.role === 'model' ? ('assistant' as const) : ('user' as const),
          content: m.text,
        })),
        { role: 'user' as const, content: text },
      ];

      const reply = await sendWithRetry(chatHistory);
      setMessages(prev => [
        ...prev,
        { id: `m-${Date.now()}`, role: 'model', text: reply },
      ]);
    } catch (err) {
      console.error('[CosapIA] Groq API error:', err);
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
