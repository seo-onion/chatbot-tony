import { useState, type FormEvent, type KeyboardEvent } from 'react';

type Props = {
  onSend: (text: string) => void;
  loading: boolean;
};

export function ChatInput({ onSend, loading }: Props) {
  const [value, setValue] = useState('');

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setValue('');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 bg-white border-t border-slate-200 px-3 sm:px-5 py-3 flex items-end gap-2"
    >
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={e => {
          const el = e.currentTarget;
          el.style.height = 'auto';
          el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
        }}
        placeholder="Cuéntanos tus dudas..."
        rows={1}
        disabled={loading}
        className="flex-1 resize-none overflow-y-auto rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent disabled:opacity-50 leading-relaxed"
      />
      <button
        type="submit"
        disabled={!value.trim() || loading}
        aria-label="Enviar"
        className="shrink-0 w-10 h-10 rounded-xl bg-navy-700 text-white flex items-center justify-center disabled:opacity-40 hover:bg-navy-800 active:scale-95 transition-all"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </button>
    </form>
  );
}
