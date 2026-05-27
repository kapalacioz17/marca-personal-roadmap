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

export function Header({ title, emoji: _emoji, isDemo, onLoadDemo, onReset, onExport, onResetSection }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-10 px-6 py-3 flex items-center justify-between backdrop-blur-md"
      style={{
        background: 'rgba(7,7,18,0.92)',
        borderBottom: '1px solid rgba(124,58,237,0.14)',
      }}
    >
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-white font-semibold text-base leading-tight">{title}</h1>
          {isDemo && (
            <span
              className="text-[11px] px-2 py-0.5 rounded-full"
              style={{
                color: '#fbbf24',
                background: 'rgba(251,191,36,0.1)',
                border: '1px solid rgba(251,191,36,0.2)',
              }}
            >
              Modo demo — datos de ejemplo cargados
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onResetSection}
          title="Limpiar este módulo"
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
          style={{ color: 'rgba(148,163,184,0.7)' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#f87171';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(248,113,113,0.08)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(148,163,184,0.7)';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          <Trash2 size={13} />
          Limpiar módulo
        </button>

        <button
          onClick={onLoadDemo}
          title="Ver datos de ejemplo"
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
          style={
            isDemo
              ? { color: '#fbbf24', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)' }
              : { color: 'rgba(148,163,184,0.7)' }
          }
        >
          <Sparkles size={13} />
          Ver demo
        </button>

        <button
          onClick={onReset}
          title="Empezar desde cero"
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
          style={{ color: 'rgba(148,163,184,0.7)' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#fff';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(148,163,184,0.7)';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          <RefreshCw size={13} />
          Nuevo roadmap
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-1.5 text-xs text-white px-3 py-1.5 rounded-lg transition-all"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            boxShadow: '0 0 12px rgba(124,58,237,0.35)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 18px rgba(168,85,247,0.55)';
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 12px rgba(124,58,237,0.35)';
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }}
        >
          <Download size={13} />
          Exportar
        </button>
      </div>
    </header>
  );
}
