export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center shrink-0">
        <span className="text-gold-500 text-xs font-bold select-none">C</span>
      </div>
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-tl-none px-4 py-3.5 flex gap-1.5 items-center">
        <span className="w-2 h-2 rounded-full bg-navy-400 dot-1 inline-block" />
        <span className="w-2 h-2 rounded-full bg-navy-400 dot-2 inline-block" />
        <span className="w-2 h-2 rounded-full bg-navy-400 dot-3 inline-block" />
      </div>
    </div>
  );
}
