import type { RoadmapData, ModuleId } from '../../types/roadmap';

interface ModuleCard {
  id: ModuleId;
  progressKey: keyof RoadmapData;
  emoji: string;
  label: string;
  summary: (data: RoadmapData) => string;
}

const modules: ModuleCard[] = [
  { id: 'vision',         progressKey: 'visionDigital',    emoji: '🎯', label: 'Visión Digital',    summary: d => d.visionDigital.cuantoQuieresGanar || 'Sin definir' },
  { id: 'mercado',        progressKey: 'mercado',          emoji: '🏪', label: 'Mercado',           summary: d => d.mercado.micronicho || 'Sin definir' },
  { id: 'avatar',         progressKey: 'avatar',           emoji: '👤', label: 'Avatar',            summary: d => d.avatar.rangoEdad ? `${d.avatar.sexo}, ${d.avatar.rangoEdad}` : 'Sin definir' },
  { id: 'oferta',         progressKey: 'oferta',           emoji: '💎', label: 'Oferta',            summary: d => d.oferta.productoLowTicket.nombre || 'Sin definir' },
  { id: 'transformacion', progressKey: 'transformacion',   emoji: '✨', label: 'Transformación',    summary: d => d.transformacion.vehiculoUnico || 'Sin definir' },
  { id: 'lider',          progressKey: 'liderCarismatico', emoji: '🦁', label: 'Líder Carismático', summary: d => d.liderCarismatico.arquetipos.filter(Boolean).join(' + ') || 'Sin definir' },
  { id: 'movimiento',     progressKey: 'movimiento',       emoji: '🔥', label: 'Movimiento',        summary: d => d.movimiento.slogan || 'Sin definir' },
  { id: 'contenido',      progressKey: 'contenido',        emoji: '📱', label: 'Contenido',         summary: d => d.contenido.frecuencia || 'Sin definir' },
  { id: 'ideas',          progressKey: 'ideas',            emoji: '💡', label: 'Ideas',             summary: d => `${d.ideas.filter(i => i.contenido).length} ideas guardadas` },
];

interface Props {
  data: RoadmapData;
  progress: Record<string, number>;
  onNavigate: (id: ModuleId) => void;
}

export function DashboardModule({ data, progress, onNavigate }: Props) {
  const allProgress = modules.map(m => progress[m.progressKey] ?? 0);
  const totalProgress = Math.round(allProgress.reduce((a, b) => a + b, 0) / allProgress.length);

  const completed  = allProgress.filter(p => p >= 80).length;
  const inProgress = allProgress.filter(p => p > 0 && p < 80).length;
  const pending    = allProgress.filter(p => p === 0).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── HERO ── */}
      <div style={{
        position: 'relative',
        borderRadius: '16px',
        padding: '1.75rem',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(168,85,247,0.15) 50%, rgba(9,9,26,0.7) 100%)',
        border: '1px solid rgba(168,85,247,0.4)',
        boxShadow: '0 0 40px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}>
        {/* Orb de glow */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '220px', height: '220px', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 65%)',
        }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.3rem', letterSpacing: '-0.02em' }}>
              Tu Marca Personal
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'rgba(196,181,253,0.65)' }}>
              Centro de Control — Roadmap completo
            </p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{
              fontSize: '4rem', fontWeight: 900, color: '#fff', lineHeight: 1,
              letterSpacing: '-0.04em',
              textShadow: '0 0 20px rgba(168,85,247,0.7), 0 0 50px rgba(124,58,237,0.4)',
            }}>
              {totalProgress}%
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(196,181,253,0.55)', marginTop: '0.2rem' }}>
              completado
            </div>
          </div>
        </div>

        {/* Barra */}
        <div style={{
          position: 'relative', height: '8px', borderRadius: '999px', marginBottom: '1.25rem',
          background: 'rgba(124,58,237,0.25)',
        }}>
          <div style={{
            position: 'absolute', inset: '0 auto 0 0', borderRadius: '999px',
            width: `${totalProgress}%`,
            background: 'linear-gradient(to right, #7c3aed, #a855f7, #c084fc)',
            boxShadow: '0 0 14px rgba(168,85,247,0.6)',
            transition: 'width 0.7s ease',
          }} />
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          {[
            { label: 'Completados', value: completed,  color: '#4ade80', shadow: 'rgba(74,222,128,0.4)'  },
            { label: 'En progreso', value: inProgress, color: '#facc15', shadow: 'rgba(250,204,21,0.4)'  },
            { label: 'Pendientes',  value: pending,    color: '#6b7280', shadow: 'transparent'            },
          ].map(stat => (
            <div key={stat.label} style={{
              textAlign: 'center', padding: '0.875rem 0.5rem',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.25)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                fontSize: '2rem', fontWeight: 800, color: stat.color, lineHeight: 1,
                textShadow: `0 0 16px ${stat.shadow}`,
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(148,163,184,0.65)', marginTop: '0.3rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROMESA ── */}
      {data.transformacion.promesa && (
        <div style={{
          borderRadius: '12px', padding: '1rem 1.25rem', textAlign: 'center',
          background: 'rgba(124,58,237,0.12)',
          border: '1px solid rgba(168,85,247,0.3)',
        }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(196,181,253,0.7)', marginBottom: '0.5rem' }}>
            Tu promesa de transformación
          </p>
          <p style={{ color: '#fff', fontStyle: 'italic', fontWeight: 500, fontSize: '0.95rem' }}>
            "{data.transformacion.promesa}"
          </p>
        </div>
      )}

      {/* ── MÓDULOS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.875rem' }}>
        {modules.map(m => {
          const pct    = progress[m.progressKey] ?? 0;
          const status = pct >= 80 ? 'done' : pct > 0 ? 'wip' : 'empty';

          const cfg = {
            done:  { label: 'Completado',  badge: 'rgba(74,222,128,0.15)',  badgeTxt: '#4ade80', bar: '#4ade80', barGlow: 'rgba(74,222,128,0.5)'  },
            wip:   { label: 'En progreso', badge: 'rgba(250,204,21,0.15)',  badgeTxt: '#facc15', bar: '#facc15', barGlow: 'rgba(250,204,21,0.5)'  },
            empty: { label: 'Pendiente',   badge: 'rgba(107,114,128,0.15)', badgeTxt: '#6b7280', bar: '#374151', barGlow: 'transparent'            },
          }[status];

          return (
            <button
              key={m.id}
              onClick={() => onNavigate(m.id)}
              style={{
                textAlign: 'left', borderRadius: '12px', padding: '1rem',
                background: 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(124,58,237,0.22)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(124,58,237,0.18)';
                el.style.borderColor = 'rgba(168,85,247,0.45)';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 8px 24px rgba(124,58,237,0.2)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(124,58,237,0.08)';
                el.style.borderColor = 'rgba(124,58,237,0.22)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.6rem' }}>{m.emoji}</span>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700,
                  padding: '0.2em 0.6em', borderRadius: '999px',
                  background: cfg.badge, color: cfg.badgeTxt,
                }}>
                  {cfg.label}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff', marginBottom: '0.3rem' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.6)', marginBottom: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {m.summary(data)}
              </div>
              <div style={{ height: '4px', borderRadius: '999px', background: 'rgba(124,58,237,0.2)' }}>
                <div style={{
                  height: '100%', borderRadius: '999px',
                  width: `${pct}%`,
                  background: cfg.bar,
                  boxShadow: pct > 0 ? `0 0 8px ${cfg.barGlow}` : 'none',
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.7rem', color: 'rgba(148,163,184,0.45)', marginTop: '0.3rem' }}>
                {pct}%
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
