import Groq from 'groq-sdk';

export const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY as string,
  dangerouslyAllowBrowser: true,
});

export const GROQ_MODEL = 'llama-3.3-70b-versatile';
