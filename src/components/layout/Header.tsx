import { Download, RefreshCw, Sparkles, Trash2 } from 'lucide-react';

interface HeaderProps {
  title: string;
  emoji: string;
  isDemo: boolean;
  onLoadDemo: () => void;
  onReset: () => void;
  onExport: () => void;
  onResetSection: () => void;
}

export function Header({ title, emoji, isDemo, onLoadDemo, onReset, onExport, onResetSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-[#0f0f13]/95 backdrop-blur border-b border-[#2a2a3e] px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <div>
          <h1 className="text-white font-semibold text-base leading-tight">{title}</h1>
          {isDemo && (
            <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
              Modo demo — datos de ejemplo cargados
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onResetSection}
          title="Limpiar este módulo"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-400/10 transition-all"
        >
          <Trash2 size={13} />
          Limpiar módulo
        </button>

        <button
          onClick={onLoadDemo}
          title="Ver datos de ejemplo"
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${
            isDemo
              ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30'
              : 'text-slate-400 hover:text-amber-400 hover:bg-amber-400/10'
          }`}
        >
          <Sparkles size={13} />
          Ver demo
        </button>

        <button
          onClick={onReset}
          title="Empezar desde cero"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
        >
          <RefreshCw size={13} />
          Nuevo roadmap
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-1.5 text-xs text-white bg-purple-600 hover:bg-purple-500 px-3 py-1.5 rounded-lg transition-all"
        >
          <Download size={13} />
          Exportar
        </button>
      </div>
    </header>
  );
}
