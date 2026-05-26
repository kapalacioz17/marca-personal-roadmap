import type { RoadmapData, ModuleId } from '../../types/roadmap';

interface ModuleCard {
  id: ModuleId;
  progressKey: keyof RoadmapData;
  emoji: string;
  label: string;
  summary: (data: RoadmapData) => string;
}

const modules: ModuleCard[] = [
  { id: 'vision',        progressKey: 'visionDigital',    emoji: '🎯', label: 'Visión Digital',    summary: d => d.visionDigital.cuantoQuieresGanar || 'Sin definir' },
  { id: 'mercado',       progressKey: 'mercado',          emoji: '🏪', label: 'Mercado',           summary: d => d.mercado.micronicho || 'Sin definir' },
  { id: 'avatar',        progressKey: 'avatar',           emoji: '👤', label: 'Avatar',            summary: d => d.avatar.rangoEdad ? `${d.avatar.sexo}, ${d.avatar.rangoEdad}` : 'Sin definir' },
  { id: 'oferta',        progressKey: 'oferta',           emoji: '💎', label: 'Oferta',            summary: d => d.oferta.productoLowTicket.nombre || 'Sin definir' },
  { id: 'transformacion',progressKey: 'transformacion',   emoji: '✨', label: 'Transformación',    summary: d => d.transformacion.vehiculoUnico || 'Sin definir' },
  { id: 'lider',         progressKey: 'liderCarismatico', emoji: '🦁', label: 'Líder Carismático', summary: d => d.liderCarismatico.arquetipos.filter(Boolean).join(' + ') || 'Sin definir' },
  { id: 'movimiento',    progressKey: 'movimiento',       emoji: '🔥', label: 'Movimiento',        summary: d => d.movimiento.slogan || 'Sin definir' },
  { id: 'contenido',     progressKey: 'contenido',        emoji: '📱', label: 'Contenido',         summary: d => d.contenido.frecuencia || 'Sin definir' },
  { id: 'ideas',         progressKey: 'ideas',            emoji: '💡', label: 'Ideas',             summary: d => `${d.ideas.filter(i => i.contenido).length} ideas guardadas` },
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
    <div className="space-y-6">

      {/* ── Hero card ── */}
      <div
        className="relative rounded-2xl p-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.22) 0%, rgba(168,85,247,0.08) 60%, rgba(9,9,26,0.6) 100%)',
          border: '1px solid rgba(124,58,237,0.28)',
        }}
      >
        {/* Glow orb */}
        <div
          className="absolute -top-10 -right-10 w-48 h-48 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)',
          }}
        />

        <div className="relative flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Tu Marca Personal</h2>
            <p className="text-sm" style={{ color: 'rgba(148,163,184,0.7)' }}>
              Centro de Control — Roadmap completo
            </p>
          </div>
          <div className="text-right">
            <div
              className="text-5xl font-extrabold text-white tabular-nums text-glow-violet"
              style={{ letterSpacing: '-0.03em' }}
            >
              {totalProgress}%
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(196,181,253,0.6)' }}>
              completado
            </div>
          </div>
        </div>

        {/* Barra total */}
        <div
          className="relative h-2 rounded-full mb-5"
          style={{ background: 'rgba(124,58,237,0.15)' }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
            style={{
              width: `${totalProgress}%`,
              background: 'linear-gradient(to right, #7c3aed, #a855f7)',
              boxShadow: '0 0 10px rgba(168,85,247,0.5)',
            }}
          />
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Completados', value: completed,  color: '#4ade80', glow: 'rgba(74,222,128,0.2)'  },
            { label: 'En progreso', value: inProgress, color: '#facc15', glow: 'rgba(250,204,21,0.2)'  },
            { label: 'Pendientes',  value: pending,    color: '#4b5563', glow: 'transparent'            },
          ].map(stat => (
            <div
              key={stat.label}
              className="text-center rounded-xl py-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div
                className="text-3xl font-bold tabular-nums"
                style={{ color: stat.color, textShadow: `0 0 12px ${stat.glow}` }}
              >
                {stat.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(100,116,139,0.8)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Promesa de transformación ── */}
      {data.transformacion.promesa && (
        <div
          className="rounded-xl p-4 text-center"
          style={{
            background: 'rgba(124,58,237,0.06)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'rgba(196,181,253,0.7)' }}
          >
            Tu promesa de transformación
          </p>
          <p className="text-white font-medium italic">"{data.transformacion.promesa}"</p>
        </div>
      )}

      {/* ── Grid de módulos ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {modules.map(m => {
          const pct    = progress[m.progressKey] ?? 0;
          const status = pct >= 80 ? 'done' : pct > 0 ? 'wip' : 'empty';

          const statusConfig = {
            done:  { label: 'Completado',  color: '#4ade80', pillBg: 'rgba(74,222,128,0.1)',   barColor: '#4ade80', barGlow: 'rgba(74,222,128,0.3)'  },
            wip:   { label: 'En progreso', color: '#facc15', pillBg: 'rgba(250,204,21,0.1)',   barColor: '#facc15', barGlow: 'rgba(250,204,21,0.3)'  },
            empty: { label: 'Pendiente',   color: '#4b5563', pillBg: 'rgba(75,85,99,0.15)',    barColor: '#3f3f5e', barGlow: 'transparent'            },
          }[status];

          return (
            <button
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className="text-left rounded-xl p-4 transition-all duration-200 group"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(124,58,237,0.1)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(124,58,237,0.07)';
                el.style.borderColor = 'rgba(168,85,247,0.28)';
                el.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(255,255,255,0.02)';
                el.style.borderColor = 'rgba(124,58,237,0.1)';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{m.emoji}</span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: statusConfig.pillBg, color: statusConfig.color }}
                >
                  {statusConfig.label}
                </span>
              </div>
              <div className="font-semibold text-sm text-white mb-1">{m.label}</div>
              <div className="text-xs mb-3 truncate" style={{ color: 'rgba(100,116,139,0.8)' }}>
                {m.summary(data)}
              </div>
              <div
                className="h-1 rounded-full"
                style={{ background: 'rgba(124,58,237,0.1)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    background: statusConfig.barColor,
                    boxShadow: pct > 0 ? `0 0 6px ${statusConfig.barGlow}` : 'none',
                  }}
                />
              </div>
              <div
                className="text-right text-[11px] mt-1 tabular-nums"
                style={{ color: 'rgba(100,116,139,0.6)' }}
              >
                {pct}%
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
