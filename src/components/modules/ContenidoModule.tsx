import type { Contenido } from '../../types/roadmap';
import { Card, Field, Input, ListField } from '../ui/Field';

interface Props {
  data: Contenido;
  onChange: (updates: Partial<Contenido>) => void;
}

const TIPO_COLORS: Record<string, string> = {
  valor: 'bg-blue-500',
  viral: 'bg-pink-500',
  venta: 'bg-yellow-500',
  vidaPropia: 'bg-green-500',
};

const TIPO_LABELS: Record<string, string> = {
  valor: '🎓 Valor',
  viral: '🚀 Viral',
  venta: '💰 Venta',
  vidaPropia: '📸 Vida Propia',
};

export function ContenidoModule({ data, onChange }: Props) {
  const updateList = (key: keyof Contenido, i: number, v: string) => {
    const arr = [...(data[key] as string[])];
    arr[i] = v;
    onChange({ [key]: arr } as Partial<Contenido>);
  };

  const tipos = data.tiposContenido;
  const total = tipos.valor + tipos.viral + tipos.venta + tipos.vidaPropia;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="📋 Configuración general">
          <Field label="Temática de tu cuenta">
            <Input
              value={data.tematica}
              onChange={e => onChange({ tematica: e.target.value })}
              placeholder="Ej: Negocios Online"
            />
          </Field>
          <Field label="Frecuencia de publicación">
            <Input
              value={data.frecuencia}
              onChange={e => onChange({ frecuencia: e.target.value })}
              placeholder="Ej: 1 post al día"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="% Contenido General" hint="Atrae audiencia amplia">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0} max={100}
                  value={data.proporcionGeneral}
                  onChange={e => onChange({ proporcionGeneral: Number(e.target.value) })}
                />
                <span className="text-slate-400 text-sm">%</span>
              </div>
            </Field>
            <Field label="% Contenido Nichado" hint="Filtra a tu avatar ideal">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0} max={100}
                  value={data.proporcionNichado}
                  onChange={e => onChange({ proporcionNichado: Number(e.target.value) })}
                />
                <span className="text-slate-400 text-sm">%</span>
              </div>
            </Field>
          </div>
        </Card>

        <Card title="🎯 Mix de tipos de contenido">
          <div className="space-y-3">
            {Object.entries(tipos).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">{TIPO_LABELS[key]}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0} max={100}
                      value={value}
                      onChange={e => onChange({
                        tiposContenido: { ...tipos, [key]: Number(e.target.value) }
                      })}
                      className="w-14 bg-[#1e1e2e] border border-[#3a3a5c] rounded px-2 py-0.5 text-xs text-white text-center"
                    />
                    <span className="text-slate-500">%</span>
                  </div>
                </div>
                <div className="h-2 bg-[#2a2a3e] rounded-full">
                  <div
                    className={`h-full rounded-full transition-all ${TIPO_COLORS[key]}`}
                    style={{ width: `${Math.min((value / Math.max(total, 100)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
            <p className={`text-xs text-right ${total === 100 ? 'text-green-400' : 'text-amber-400'}`}>
              Total: {total}% {total === 100 ? '✅' : '(debería sumar 100%)'}
            </p>
          </div>
        </Card>
      </div>

      <Card title="🏛️ Pilares de contenido">
        <ListField
          label="Los 3 temas principales de tu cuenta"
          values={data.pilares}
          onChange={(i, v) => updateList('pilares', i, v)}
          placeholder="Ej: Negocios Online"
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="🎞️ Formatos de Reels">
          <ListField
            label="Tipos de reels que hacés"
            values={data.formatosReels.length ? data.formatosReels : ['', '', '']}
            onChange={(i, v) => updateList('formatosReels', i, v)}
            placeholder="Tipo de reel..."
          />
        </Card>
        <Card title="📰 Formatos de Posts">
          <ListField
            label="Tipos de posts estáticos"
            values={data.formatosPost.length ? data.formatosPost : ['', '', '']}
            onChange={(i, v) => updateList('formatosPost', i, v)}
            placeholder="Tipo de post..."
          />
        </Card>
        <Card title="📚 Formatos de Carrusel">
          <ListField
            label="Tipos de carruseles"
            values={data.formatosCarrusel.length ? data.formatosCarrusel : ['', '', '']}
            onChange={(i, v) => updateList('formatosCarrusel', i, v)}
            placeholder="Tipo de carrusel..."
          />
        </Card>
        <Card title="📖 Formatos de Historias">
          <ListField
            label="Tipos de contenido para Stories"
            values={data.formatosHistorias.length ? data.formatosHistorias : ['', '', '']}
            onChange={(i, v) => updateList('formatosHistorias', i, v)}
            placeholder="Tipo de historia..."
          />
        </Card>
      </div>
    </div>
  );
}
