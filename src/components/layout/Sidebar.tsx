import { Target, Store, User, Gift, Sparkles, Crown, Flame, Video, Lightbulb, LayoutDashboard } from 'lucide-react';
import type { ModuleId } from '../../types/roadmap';

interface SidebarItem {
  id: ModuleId;
  label: string;
  icon: React.ReactNode;
}

const items: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard',         icon: <LayoutDashboard size={15} /> },
  { id: 'vision',    label: 'Visión Digital',     icon: <Target size={15} /> },
  { id: 'mercado',   label: 'Mercado',            icon: <Store size={15} /> },
  { id: 'avatar',    label: 'Avatar',             icon: <User size={15} /> },
  { id: 'oferta',    label: 'Oferta',             icon: <Gift size={15} /> },
  { id: 'transformacion', label: 'Transformación',icon: <Sparkles size={15} /> },
  { id: 'lider',     label: 'Líder Carismático',  icon: <Crown size={15} /> },
  { id: 'movimiento',label: 'Movimiento',          icon: <Flame size={15} /> },
  { id: 'contenido', label: 'Contenido',           icon: <Video size={15} /> },
  { id: 'ideas',     label: 'Ideas',               icon: <Lightbulb size={15} /> },
];

const ID_TO_KEY: Record<string, string> = {
  vision: 'visionDigital',
  lider:  'liderCarismatico',
};

interface SidebarProps {
  active: ModuleId;
  onSelect: (id: ModuleId) => void;
  progress: Record<string, number>;
}

export function Sidebar({ active, onSelect, progress }: SidebarProps) {
  const moduleItems = items.filter(i => i.id !== 'dashboard');
  const totalProgress = Math.round(
    moduleItems.reduce((sum, item) => sum + (progress[ID_TO_KEY[item.id] ?? item.id] ?? 0), 0) /
    moduleItems.length
  );

  return (
    <aside
      className="w-64 shrink-0 flex flex-col h-screen sticky top-0 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0c0c1e 0%, #09091a 100%)',
        borderRight: '1px solid rgba(124,58,237,0.18)',
      }}
    >
      {/* Glow ambiental en esquina superior */}
      <div
        className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top left, rgba(124,58,237,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <div
        className="relative px-5 py-4"
        style={{ borderBottom: '1px solid rgba(124,58,237,0.12)' }}
      >
        <div className="flex items-center gap-2.5 mb-0.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              boxShadow: '0 0 12px rgba(124,58,237,0.5)',
            }}
          >
            🚀
          </div>
          <span className="font-bold text-white text-sm tracking-tight">Marca Personal</span>
        </div>
        <p className="text-[11px] pl-[38px]" style={{ color: 'rgba(148,112,255,0.55)' }}>
          Roadmap interactivo
        </p>
      </div>

      {/* Progreso total */}
      <div
        className="relative px-5 py-3"
        style={{ borderBottom: '1px solid rgba(124,58,237,0.1)' }}
      >
        <div className="flex justify-between items-center text-xs mb-1.5">
          <span style={{ color: 'rgba(148,163,184,0.7)' }}>Progreso total</span>
          <span
            className="font-bold tabular-nums"
            style={{ color: '#c4b5fd' }}
          >
            {totalProgress}%
          </span>
        </div>
        <div className="h-1 rounded-full" style={{ background: 'rgba(124,58,237,0.12)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${totalProgress}%`,
              background: 'linear-gradient(to right, #7c3aed, #a855f7)',
              boxShadow: totalProgress > 10 ? '0 0 8px rgba(168,85,247,0.4)' : 'none',
            }}
          />
        </div>
      </div>

      {/* Navegación */}
      <nav className="relative flex-1 overflow-y-auto py-2">
        {items.map(item => {
          const progressKey = ID_TO_KEY[item.id] ?? item.id;
          const pct = item.id === 'dashboard' ? totalProgress : (progress[progressKey] ?? 0);
          const isActive = active === item.id;

          const pillColor =
            pct >= 80  ? { bg: 'rgba(74,222,128,0.12)',  text: '#4ade80' } :
            pct >= 40  ? { bg: 'rgba(250,204,21,0.12)',  text: '#facc15' } :
            pct >  0   ? { bg: 'rgba(124,58,237,0.15)',  text: '#a78bfa' } :
                         { bg: 'rgba(255,255,255,0.04)', text: '#4b5563' };

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-all duration-150 relative group"
              style={{
                borderLeft: isActive ? '2px solid #a855f7' : '2px solid transparent',
                background: isActive
                  ? 'linear-gradient(to right, rgba(124,58,237,0.16), rgba(124,58,237,0.04))'
                  : 'transparent',
                color: isActive ? '#fff' : 'rgba(148,163,184,0.75)',
              }}
            >
              {/* Icono */}
              <span
                className="shrink-0 transition-colors"
                style={{ color: isActive ? '#c4b5fd' : 'rgba(100,116,139,0.8)' }}
              >
                {item.icon}
              </span>

              {/* Label */}
              <span className="text-[13px] flex-1 leading-none">{item.label}</span>

              {/* Pill de progreso */}
              {item.id !== 'dashboard' && (
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full tabular-nums shrink-0"
                  style={{
                    background: isActive ? 'rgba(168,85,247,0.2)' : pillColor.bg,
                    color: isActive ? '#c4b5fd' : pillColor.text,
                  }}
                >
                  {pct}%
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-5 py-3 text-center"
        style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}
      >
        <p className="text-[11px]" style={{ color: 'rgba(124,58,237,0.45)' }}>
          Guardado automáticamente 💾
        </p>
      </div>
    </aside>
  );
}
