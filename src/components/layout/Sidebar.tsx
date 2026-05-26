import { Target, Store, User, Gift, Sparkles, Crown, Flame, Video, Lightbulb, LayoutDashboard } from 'lucide-react';
import type { ModuleId } from '../../types/roadmap';

interface SidebarItem {
  id: ModuleId;
  label: string;
  icon: React.ReactNode;
}

const items: SidebarItem[] = [
  { id: 'dashboard',     label: 'Dashboard',         icon: <LayoutDashboard size={15} /> },
  { id: 'vision',        label: 'Visión Digital',     icon: <Target size={15} /> },
  { id: 'mercado',       label: 'Mercado',            icon: <Store size={15} /> },
  { id: 'avatar',        label: 'Avatar',             icon: <User size={15} /> },
  { id: 'oferta',        label: 'Oferta',             icon: <Gift size={15} /> },
  { id: 'transformacion',label: 'Transformación',     icon: <Sparkles size={15} /> },
  { id: 'lider',         label: 'Líder Carismático',  icon: <Crown size={15} /> },
  { id: 'movimiento',    label: 'Movimiento',         icon: <Flame size={15} /> },
  { id: 'contenido',     label: 'Contenido',          icon: <Video size={15} /> },
  { id: 'ideas',         label: 'Ideas',              icon: <Lightbulb size={15} /> },
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
    <aside style={{
      width: '256px', flexShrink: 0,
      display: 'flex', flexDirection: 'column',
      height: '100vh', position: 'sticky', top: 0,
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #0e0e22 0%, #0a0a18 100%)',
      borderRight: '1px solid rgba(124,58,237,0.25)',
      boxShadow: '4px 0 32px rgba(0,0,0,0.5)',
    }}>

      {/* Glow ambiental superior */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '200px', height: '200px', pointerEvents: 'none',
        background: 'radial-gradient(circle at top left, rgba(124,58,237,0.22) 0%, transparent 65%)',
      }} />

      {/* ── Logo ── */}
      <div style={{
        position: 'relative',
        padding: '1.1rem 1.25rem',
        borderBottom: '1px solid rgba(124,58,237,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.2rem' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            boxShadow: '0 0 14px rgba(124,58,237,0.55)',
          }}>
            🚀
          </div>
          <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.875rem', letterSpacing: '-0.01em' }}>
            Marca Personal
          </span>
        </div>
        <p style={{ fontSize: '0.7rem', paddingLeft: '2.4rem', color: 'rgba(167,139,250,0.5)' }}>
          Roadmap interactivo
        </p>
      </div>

      {/* ── Progreso total ── */}
      <div style={{
        position: 'relative',
        padding: '0.875rem 1.25rem',
        borderBottom: '1px solid rgba(124,58,237,0.12)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'rgba(148,163,184,0.65)' }}>Progreso total</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#c4b5fd' }}>{totalProgress}%</span>
        </div>
        <div style={{ height: '4px', borderRadius: '999px', background: 'rgba(124,58,237,0.2)' }}>
          <div style={{
            height: '100%', borderRadius: '999px',
            width: `${totalProgress}%`,
            background: 'linear-gradient(to right, #7c3aed, #a855f7)',
            boxShadow: totalProgress > 5 ? '0 0 8px rgba(168,85,247,0.5)' : 'none',
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0', position: 'relative' }}>
        {items.map(item => {
          const progressKey = ID_TO_KEY[item.id] ?? item.id;
          const pct = item.id === 'dashboard' ? totalProgress : (progress[progressKey] ?? 0);
          const isActive = active === item.id;

          const pillStyle: React.CSSProperties = pct >= 80
            ? { background: 'rgba(74,222,128,0.18)',  color: '#4ade80' }
            : pct >= 40
            ? { background: 'rgba(250,204,21,0.18)',  color: '#facc15' }
            : pct > 0
            ? { background: 'rgba(167,139,250,0.18)', color: '#a78bfa' }
            : { background: 'rgba(75,85,99,0.2)',     color: '#4b5563' };

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: '0.65rem', padding: '0.7rem 1.1rem 0.7rem 0.9rem',
                textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s',
                borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                borderLeft: isActive ? '3px solid #a855f7' : '3px solid transparent',
                background: isActive
                  ? 'linear-gradient(to right, rgba(124,58,237,0.25), rgba(124,58,237,0.06))'
                  : 'transparent',
                color: isActive ? '#fff' : 'rgba(148,163,184,0.7)',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,58,237,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#e2e8f0';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(148,163,184,0.7)';
                }
              }}
            >
              {/* Icono */}
              <span style={{
                flexShrink: 0,
                color: isActive ? '#c4b5fd' : 'rgba(100,116,139,0.8)',
                transition: 'color 0.15s',
              }}>
                {item.icon}
              </span>

              {/* Label */}
              <span style={{ fontSize: '0.8rem', flex: 1, fontWeight: isActive ? 600 : 400 }}>
                {item.label}
              </span>

              {/* Pill de progreso */}
              {item.id !== 'dashboard' && (
                <span style={{
                  ...pillStyle,
                  fontSize: '0.65rem', fontWeight: 700,
                  padding: '0.15em 0.55em', borderRadius: '999px',
                  flexShrink: 0, fontVariantNumeric: 'tabular-nums',
                }}>
                  {pct}%
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div style={{
        padding: '0.75rem 1.25rem', textAlign: 'center',
        borderTop: '1px solid rgba(124,58,237,0.12)',
      }}>
        <p style={{ fontSize: '0.65rem', color: 'rgba(124,58,237,0.5)' }}>
          Guardado automáticamente 💾
        </p>
      </div>
    </aside>
  );
}
