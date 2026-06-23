export function Header() {
  return (
    <header className="bg-navy-800 px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 shadow-md shrink-0">
      <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center shrink-0">
        <span className="text-navy-900 font-bold text-base select-none">C</span>
      </div>
      <div className="min-w-0">
        <p className="text-white font-semibold text-base leading-tight">CosapIA</p>
        <p className="text-navy-200 text-xs">Crédito hipotecario</p>
      </div>
      <div className="ml-auto flex items-center gap-2 shrink-0">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-navy-200 text-xs hidden sm:block">En línea</span>
      </div>
    </header>
  );
}
