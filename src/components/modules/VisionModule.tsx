import type { VisionDigital } from '../../types/roadmap';
import { Card, Field, Input, Textarea, ListField } from '../ui/Field';

interface Props {
  data: VisionDigital;
  onChange: (updates: Partial<VisionDigital>) => void;
}

export function VisionModule({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Tu visión">
          <Field label="¿Dónde te ves en 1 año con tu negocio digital?">
            <Textarea
              value={data.dondeTeVes}
              onChange={e => onChange({ dondeTeVes: e.target.value })}
              placeholder="Describe tu negocio ideal en 1 año..."
              rows={4}
            />
          </Field>
          <Field label="¿Cuál es tu propósito de vida?">
            <Textarea
              value={data.propositoDeVida}
              onChange={e => onChange({ propositoDeVida: e.target.value })}
              placeholder="Tu porqué profundo..."
            />
          </Field>
          <Field label="¿Cuánto te ves ganando?">
            <Input
              value={data.cuantoQuieresGanar}
              onChange={e => onChange({ cuantoQuieresGanar: e.target.value })}
              placeholder="Ej: $3,000 USD mensuales"
            />
          </Field>
        </Card>

        <Card title="Tus 5 sueños">
          <ListField
            label="Escribe los 5 sueños que cumplirías con tu negocio digital"
            hint="Sé específico y emocional"
            values={data.suenos}
            onChange={(i, v) => {
              const arr = [...data.suenos];
              arr[i] = v;
              onChange({ suenos: arr });
            }}
            placeholder="Sueño..."
          />
        </Card>
      </div>

      <Card title="Nivel de compromiso">
        <Field
          label={`Sombrea tu nivel de compromiso: ${data.nivelCompromiso}/10`}
          hint="¿Qué tan comprometido estás con construir tu marca personal?"
        >
          <div className="space-y-3">
            <input
              type="range"
              min={1}
              max={10}
              value={data.nivelCompromiso}
              onChange={e => onChange({ nivelCompromiso: Number(e.target.value) })}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between">
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <div
                  key={n}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    n <= data.nivelCompromiso
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-[#2a2a3e] text-slate-500'
                  }`}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </Field>
      </Card>
    </div>
  );
}
