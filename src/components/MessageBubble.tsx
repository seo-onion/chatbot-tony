import type { Message } from '../hooks/useChat';

type Props = { message: Message };

export function MessageBubble({ message }: Props) {
  const isBot = message.role === 'model';

  return (
    <div className={`flex items-end gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center shrink-0 mb-0.5">
          <span className="text-gold-500 text-xs font-bold select-none">C</span>
        </div>
      )}
      <div
        className={[
          'max-w-[78%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words',
          isBot
            ? 'bg-white text-navy-800 border border-slate-100 shadow-sm rounded-tl-none'
            : 'bg-navy-700 text-white rounded-br-none',
        ].join(' ')}
      >
        {message.text}
      </div>
    </div>
  );
}
