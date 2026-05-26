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

/* ── tokens visuales ── */
const card: React.CSSProperties = {
  background: 'rgba(124,58,237,0.08)',
  border: '1px solid rgba(124,58,237,0.22)',
  borderRadius: '14px',
};

export function DashboardModule({ data, progress, onNavigate }: Props) {
  const allProgress = modules.map(m => progress[m.progressKey] ?? 0);
  const totalProgress = Math.round(allProgress.reduce((a, b) => a + b, 0) / allProgress.length);

  const completed  = allProgress.filter(p => p >= 80).length;
  const inProgress = allProgress.filter(p => p > 0 && p < 80).length;
  const pending    = allProgress.filter(p => p === 0).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '960px' }}>

      {/* ══════════════════ HERO ══════════════════ */}
      <div style={{
        position: 'relative',
        borderRadius: '18px',
        padding: '2.25rem 2.5rem',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.38) 0%, rgba(168,85,247,0.18) 50%, rgba(9,9,26,0.65) 100%)',
        border: '1px solid rgba(168,85,247,0.38)',
        boxShadow: '0 8px 40px rgba(124,58,237,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}>
        {/* Orb */}
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '260px', height: '260px', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(168,85,247,0.28) 0%, transparent 65%)',
        }} />

        {/* Título + % */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', marginBottom: '1.75rem' }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(196,181,253,0.65)', marginBottom: '0.5rem' }}>
              Tu Progreso General
            </p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
              Tu Marca Personal
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'rgba(196,181,253,0.55)' }}>
              Centro de Control · Roadmap completo
            </p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{
              fontSize: '4.5rem', fontWeight: 900, color: '#fff',
              lineHeight: 1, letterSpacing: '-0.04em',
              textShadow: '0 0 24px rgba(168,85,247,0.75), 0 0 60px rgba(124,58,237,0.45)',
            }}>
              {totalProgress}%
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(196,181,253,0.5)', marginTop: '0.3rem' }}>
              completado
            </div>
          </div>
        </div>

        {/* Barra */}
        <div style={{
          height: '8px', borderRadius: '999px',
          background: 'rgba(124,58,237,0.25)',
          marginBottom: '1.75rem',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: '0 auto 0 0',
            borderRadius: '999px',
            width: `${totalProgress}%`,
            background: 'linear-gradient(to right, #7c3aed, #a855f7, #c084fc)',
            boxShadow: '0 0 16px rgba(168,85,247,0.65)',
            transition: 'width 0.7s ease',
          }} />
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          {[
            { label: 'Completados', value: completed,  color: '#4ade80', glow: 'rgba(74,222,128,0.45)'  },
            { label: 'En progreso', value: inProgress, color: '#facc15', glow: 'rgba(250,204,21,0.45)'  },
            { label: 'Pendientes',  value: pending,    color: '#6b7280', glow: 'transparent'             },
          ].map(s => (
            <div key={s.label} style={{
              textAlign: 'center', padding: '1rem 0.5rem',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.28)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: s.color, lineHeight: 1, textShadow: `0 0 18px ${s.glow}` }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(148,163,184,0.6)', marginTop: '0.4rem' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════ PROMESA ══════════════════ */}
      {data.transformacion.promesa && (
        <div style={{
          borderRadius: '12px', padding: '1.25rem 1.75rem', textAlign: 'center',
          background: 'rgba(124,58,237,0.1)',
          border: '1px solid rgba(168,85,247,0.28)',
        }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(196,181,253,0.6)', marginBottom: '0.6rem' }}>
            Tu promesa de transformación
          </p>
          <p style={{ color: '#fff', fontStyle: 'italic', fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 }}>
            "{data.transformacion.promesa}"
          </p>
        </div>
      )}

      {/* ══════════════════ MÓDULOS ══════════════════ */}
      <div>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(196,181,253,0.5)', marginBottom: '1.25rem' }}>
          Módulos del Roadmap
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {modules.map(m => {
            const pct    = progress[m.progressKey] ?? 0;
            const status = pct >= 80 ? 'done' : pct > 0 ? 'wip' : 'empty';

            const cfg = {
              done:  { label: 'Completado',  badge: 'rgba(74,222,128,0.14)',  badgeTxt: '#4ade80', bar: '#4ade80', barGlow: 'rgba(74,222,128,0.55)'  },
              wip:   { label: 'En progreso', badge: 'rgba(250,204,21,0.14)',  badgeTxt: '#facc15', bar: '#facc15', barGlow: 'rgba(250,204,21,0.55)'  },
              empty: { label: 'Pendiente',   badge: 'rgba(107,114,128,0.14)', badgeTxt: '#6b7280', bar: '#374151', barGlow: 'transparent'             },
            }[status];

            return (
              <button
                key={m.id}
                onClick={() => onNavigate(m.id)}
                style={{
                  ...card,
                  textAlign: 'left', cursor: 'pointer', padding: '1.4rem 1.5rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = 'rgba(124,58,237,0.18)';
                  el.style.borderColor = 'rgba(168,85,247,0.45)';
                  el.style.transform = 'translateY(-3px)';
                  el.style.boxShadow = '0 12px 30px rgba(124,58,237,0.22)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = card.background as string;
                  el.style.borderColor = 'rgba(124,58,237,0.22)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Header de card */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.75rem' }}>{m.emoji}</span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700,
                    padding: '0.25em 0.65em', borderRadius: '999px',
                    background: cfg.badge, color: cfg.badgeTxt,
                  }}>
                    {cfg.label}
                  </span>
                </div>

                {/* Nombre */}
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginBottom: '0.4rem' }}>
                  {m.label}
                </div>

                {/* Resumen */}
                <div style={{
                  fontSize: '0.78rem', color: 'rgba(148,163,184,0.55)',
                  marginBottom: '1rem',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {m.summary(data)}
                </div>

                {/* Barra */}
                <div style={{ height: '4px', borderRadius: '999px', background: 'rgba(124,58,237,0.18)' }}>
                  <div style={{
                    height: '100%', borderRadius: '999px',
                    width: `${pct}%`,
                    background: cfg.bar,
                    boxShadow: pct > 0 ? `0 0 8px ${cfg.barGlow}` : 'none',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.7rem', color: 'rgba(148,163,184,0.4)', marginTop: '0.4rem' }}>
                  {pct}%
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
