import type { RoadmapData, ModuleId } from '../../types/roadmap';

interface ModuleCard {
  id: ModuleId;
  progressKey: keyof RoadmapData;
  emoji: string;
  label: string;
  summary: (data: RoadmapData) => string;
}

const modules: ModuleCard[] = [
  { id: 'vision', progressKey: 'visionDigital', emoji: '🎯', label: 'Visión Digital', summary: d => d.visionDigital.cuantoQuieresGanar || 'Sin definir' },
  { id: 'mercado', progressKey: 'mercado', emoji: '🏪', label: 'Mercado', summary: d => d.mercado.micronicho || 'Sin definir' },
  { id: 'avatar', progressKey: 'avatar', emoji: '👤', label: 'Avatar', summary: d => d.avatar.rangoEdad ? `${d.avatar.sexo}, ${d.avatar.rangoEdad}` : 'Sin definir' },
  { id: 'oferta', progressKey: 'oferta', emoji: '💎', label: 'Oferta', summary: d => d.oferta.productoLowTicket.nombre || 'Sin definir' },
  { id: 'transformacion', progressKey: 'transformacion', emoji: '✨', label: 'Transformación', summary: d => d.transformacion.vehiculoUnico || 'Sin definir' },
  { id: 'lider', progressKey: 'liderCarismatico', emoji: '🦁', label: 'Líder Carismático', summary: d => d.liderCarismatico.arquetipos.filter(Boolean).join(' + ') || 'Sin definir' },
  { id: 'movimiento', progressKey: 'movimiento', emoji: '🔥', label: 'Movimiento', summary: d => d.movimiento.slogan || 'Sin definir' },
  { id: 'contenido', progressKey: 'contenido', emoji: '📱', label: 'Contenido', summary: d => d.contenido.frecuencia || 'Sin definir' },
  { id: 'ideas', progressKey: 'ideas', emoji: '💡', label: 'Ideas', summary: d => `${d.ideas.filter(i => i.contenido).length} ideas guardadas` },
];

interface Props {
  data: RoadmapData;
  progress: Record<string, number>;
  onNavigate: (id: ModuleId) => void;
}

export function DashboardModule({ data, progress, onNavigate }: Props) {
  const allProgress = modules.map(m => {
    const key = m.progressKey === 'liderCarismatico' ? 'liderCarismatico' : m.progressKey;
    return progress[key] ?? 0;
  });
  const totalProgress = Math.round(allProgress.reduce((a, b) => a + b, 0) / allProgress.length);

  const completed = allProgress.filter(p => p >= 80).length;
  const inProgress = allProgress.filter(p => p > 0 && p < 80).length;
  const pending = allProgress.filter(p => p === 0).length;

  return (
    <div className="space-y-6">
      {/* Resumen total */}
      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Tu Marca Personal</h2>
            <p className="text-slate-400 text-sm">Centro de Control — Roadmap completo</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white">{totalProgress}%</div>
            <div className="text-xs text-slate-400">completado</div>
          </div>
        </div>

        <div className="h-3 bg-[#2a2a3e] rounded-full mb-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
            style={{ width: `${totalProgress}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Completados', value: completed, color: 'text-green-400' },
            { label: 'En progreso', value: inProgress, color: 'text-yellow-400' },
            { label: 'Pendientes', value: pending, color: 'text-slate-500' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Promesa visible si está definida */}
      {data.transformacion.promesa && (
        <div className="bg-[#16162a] border border-purple-500/30 rounded-xl p-4 text-center">
          <p className="text-xs text-purple-400 mb-2 uppercase tracking-widest">Tu promesa de transformación</p>
          <p className="text-white font-medium italic">"{data.transformacion.promesa}"</p>
        </div>
      )}

      {/* Grid de módulos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map(m => {
          const pct = progress[m.progressKey === 'liderCarismatico' ? 'liderCarismatico' : m.progressKey] ?? 0;
          const status = pct >= 80 ? 'done' : pct > 0 ? 'wip' : 'empty';
          const statusConfig = {
            done: { label: 'Completado', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-500/20' },
            wip: { label: 'En progreso', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-500/20' },
            empty: { label: 'Pendiente', color: 'text-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-700' },
          }[status];

          return (
            <button
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className={`text-left bg-[#16162a] border ${statusConfig.border} rounded-xl p-4 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all group`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{m.emoji}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig.bg} ${statusConfig.color}`}>
                  {statusConfig.label}
                </span>
              </div>
              <div className="font-semibold text-sm text-white mb-1">{m.label}</div>
              <div className="text-xs text-slate-500 mb-3 truncate">{m.summary(data)}</div>
              <div className="h-1.5 bg-[#2a2a3e] rounded-full">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-right text-xs text-slate-600 mt-1">{pct}%</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
