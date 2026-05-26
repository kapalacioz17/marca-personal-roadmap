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

/* ── colores semánticos ── */
const byPct = (pct: number) =>
  pct >= 80 ? { bar: '#4ade80', glow: 'rgba(74,222,128,0.55)',  badge: 'rgba(74,222,128,0.14)',  txt: '#4ade80',  label: 'Completado'  } :
  pct > 0   ? { bar: '#facc15', glow: 'rgba(250,204,21,0.55)',  badge: 'rgba(250,204,21,0.14)',  txt: '#facc15',  label: 'En progreso' } :
              { bar: '#374151', glow: 'transparent',            badge: 'rgba(107,114,128,0.14)', txt: '#6b7280',  label: 'Pendiente'   };

export function DashboardModule({ data, progress, onNavigate }: Props) {
  const allPct   = modules.map(m => progress[m.progressKey] ?? 0);
  const total    = Math.round(allPct.reduce((a, b) => a + b, 0) / allPct.length);
  const done     = allPct.filter(p => p >= 80).length;
  const wip      = allPct.filter(p => p > 0 && p < 80).length;
  const pending  = allPct.filter(p => p === 0).length;

  // Módulo activo = el primero incompleto
  const activeIdx  = modules.findIndex(m => (progress[m.progressKey] ?? 0) < 80);
  const activeModule = activeIdx >= 0 ? modules[activeIdx] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* ══════════════ HERO HORIZONTAL (exacto al mockup C) ══════════════ */}
      <div style={{
        borderRadius: '14px',
        padding: '1.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.38) 0%, rgba(168,85,247,0.16) 55%, rgba(9,9,26,0.6) 100%)',
        border: '1px solid rgba(168,85,247,0.38)',
        boxShadow: '0 4px 32px rgba(124,58,237,0.15)',
      }}>
        {/* Orb glow */}
        <div style={{
          position: 'absolute', top: '-40px', right: '60px',
          width: '200px', height: '200px', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 65%)',
        }} />

        {/* Izquierda: label + título + barra */}
        <div style={{ flex: 1, position: 'relative' }}>
          <p style={{
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(196,181,253,0.65)',
            marginBottom: '0.4rem',
          }}>
            Tu Progreso General
          </p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
            Tu Marca Personal
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'rgba(196,181,253,0.5)', marginBottom: '1.1rem' }}>
            Centro de Control · Roadmap completo
          </p>

          {/* Barra de progreso */}
          <div style={{ height: '8px', borderRadius: '999px', background: 'rgba(124,58,237,0.2)', position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: '0 auto 0 0',
              width: `${total}%`, borderRadius: '999px',
              background: 'linear-gradient(to right, #7c3aed, #a855f7, #c084fc)',
              boxShadow: '0 0 14px rgba(168,85,247,0.6)',
              transition: 'width 0.7s ease',
            }} />
          </div>
        </div>

        {/* Derecha: número grande */}
        <div style={{ textAlign: 'right', flexShrink: 0, position: 'relative' }}>
          <div style={{
            fontSize: '4.5rem', fontWeight: 900, color: '#fff',
            lineHeight: 1, letterSpacing: '-0.04em',
            textShadow: '0 0 24px rgba(168,85,247,0.75), 0 0 60px rgba(124,58,237,0.45)',
          }}>
            {total}%
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(196,181,253,0.5)', marginTop: '0.3rem' }}>
            completado
          </div>
        </div>
      </div>

      {/* ══════════════ 4 INFO-CARDS (exacto al mockup C) ══════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

        {/* Módulo Activo */}
        <div style={{
          borderRadius: '12px', padding: '1.25rem 1.4rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(124,58,237,0.18)',
        }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(196,181,253,0.55)', marginBottom: '0.5rem' }}>
            Módulo Activo
          </p>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>
            {activeModule ? `${activeModule.emoji} ${activeModule.label}` : '✅ Todo completado'}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.5)' }}>
            {activeModule ? `${progress[activeModule.progressKey] ?? 0}% completado` : '100% completado'}
          </p>
        </div>

        {/* Meta de Ingresos */}
        <div style={{
          borderRadius: '12px', padding: '1.25rem 1.4rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(124,58,237,0.18)',
        }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(196,181,253,0.55)', marginBottom: '0.5rem' }}>
            Meta de Ingresos
          </p>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>
            {data.visionDigital.cuantoQuieresGanar || '—'}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.5)' }}>USD mensuales</p>
        </div>

        {/* Completados */}
        <div style={{
          borderRadius: '12px', padding: '1.25rem 1.4rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(124,58,237,0.18)',
        }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(196,181,253,0.55)', marginBottom: '0.5rem' }}>
            Completados
          </p>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: '#4ade80', marginBottom: '0.2rem' }}>
            {done} / {modules.length}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.5)' }}>
            {wip} en progreso · {pending} pendientes
          </p>
        </div>

        {/* Compromiso */}
        <div style={{
          borderRadius: '12px', padding: '1.25rem 1.4rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(124,58,237,0.18)',
        }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(196,181,253,0.55)', marginBottom: '0.5rem' }}>
            Compromiso
          </p>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>
            {data.visionDigital.nivelCompromiso} / 10 🔥
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.5)' }}>nivel declarado</p>
        </div>
      </div>

      {/* ══════════════ PROMESA ══════════════ */}
      {data.transformacion.promesa && (
        <div style={{
          borderRadius: '12px', padding: '1.1rem 1.5rem', textAlign: 'center',
          background: 'rgba(124,58,237,0.08)',
          border: '1px solid rgba(168,85,247,0.22)',
        }}>
          <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(196,181,253,0.55)', marginBottom: '0.45rem' }}>
            Tu promesa de transformación
          </p>
          <p style={{ color: '#fff', fontStyle: 'italic', fontWeight: 500 }}>
            "{data.transformacion.promesa}"
          </p>
        </div>
      )}

      {/* ══════════════ GRID DE MÓDULOS ══════════════ */}
      <div>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(196,181,253,0.4)', marginBottom: '1rem' }}>
          Módulos del Roadmap
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {modules.map(m => {
            const pct = progress[m.progressKey] ?? 0;
            const cfg = byPct(pct);

            return (
              <button
                key={m.id}
                onClick={() => onNavigate(m.id)}
                style={{
                  textAlign: 'left', cursor: 'pointer',
                  borderRadius: '12px', padding: '1.25rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(124,58,237,0.18)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = 'rgba(124,58,237,0.14)';
                  el.style.borderColor = 'rgba(168,85,247,0.4)';
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = '0 8px 24px rgba(124,58,237,0.18)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = 'rgba(255,255,255,0.03)';
                  el.style.borderColor = 'rgba(124,58,237,0.18)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, padding: '0.2em 0.6em', borderRadius: '999px', background: cfg.badge, color: cfg.txt }}>
                    {cfg.label}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', marginBottom: '0.3rem' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.5)', marginBottom: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {m.summary(data)}
                </div>
                <div style={{ height: '3px', borderRadius: '999px', background: 'rgba(124,58,237,0.18)' }}>
                  <div style={{
                    height: '100%', borderRadius: '999px',
                    width: `${pct}%`, background: cfg.bar,
                    boxShadow: pct > 0 ? `0 0 7px ${cfg.glow}` : 'none',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.68rem', color: 'rgba(148,163,184,0.38)', marginTop: '0.3rem' }}>
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
