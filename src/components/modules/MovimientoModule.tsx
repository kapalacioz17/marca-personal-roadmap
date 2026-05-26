import type { Movimiento } from '../../types/roadmap';
import { Card, Field, Input, Textarea, ListField } from '../ui/Field';

interface Props {
  data: Movimiento;
  onChange: (updates: Partial<Movimiento>) => void;
}

export function MovimientoModule({ data, onChange }: Props) {
  const updateList = (key: keyof Movimiento, i: number, v: string) => {
    const arr = [...(data[key] as string[])];
    arr[i] = v;
    onChange({ [key]: arr } as Partial<Movimiento>);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="🧭 Ideal Filosófico">
          <Field label="¿Cuál es tu causa / propósito mayor?" hint="Lo que defendés más allá de tu producto">
            <Textarea
              value={data.causaPropósito}
              onChange={e => onChange({ causaPropósito: e.target.value })}
              placeholder="Lucho por un mundo donde..."
              rows={4}
            />
          </Field>
        </Card>

        <Card title="💡 Slogan">
          <Field label="Tu frase que resume el movimiento" hint="Corta, memorable, que inspire acción">
            <Input
              value={data.slogan}
              onChange={e => onChange({ slogan: e.target.value })}
              placeholder="Ej: Donde la crianza y el éxito coexisten."
            />
          </Field>
          {data.slogan && (
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 rounded-xl text-center">
              <p className="text-white font-semibold italic">"{data.slogan}"</p>
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="🙌 Creencias del movimiento">
          <ListField
            label="Lo que vos y tu comunidad creen con convicción"
            values={data.creencias}
            onChange={(i, v) => updateList('creencias', i, v)}
            placeholder="Creemos que..."
          />
        </Card>

        <Card title="⚔️ Enemigos en común">
          <ListField
            label="Lo que tu comunidad rechaza junto a vos"
            hint="No personas — sistemas, creencias, ideas"
            values={data.enemigosEnComun}
            onChange={(i, v) => updateList('enemigosEnComun', i, v)}
            placeholder="En contra de..."
          />
        </Card>

        <Card title="🔄 Rituales de comunidad">
          <ListField
            label="Prácticas repetibles que unen al movimiento"
            values={data.rituales}
            onChange={(i, v) => updateList('rituales', i, v)}
            placeholder="Ej: Domingo de planificación..."
          />
        </Card>

        <Card title="✍️ Frases y mantras">
          <ListField
            label="Las frases que tu comunidad repite"
            values={data.frasesYMantras}
            onChange={(i, v) => updateList('frasesYMantras', i, v)}
            placeholder="Frase poderosa..."
          />
        </Card>
      </div>
    </div>
  );
}
