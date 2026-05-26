import type { LiderCarismatico } from '../../types/roadmap';
import { Card, Field, Input, Textarea, ListField } from '../ui/Field';

interface Props {
  data: LiderCarismatico;
  onChange: (updates: Partial<LiderCarismatico>) => void;
}

export function LiderModule({ data, onChange }: Props) {
  const updateList = (key: keyof LiderCarismatico, i: number, v: string) => {
    const arr = [...(data[key] as string[])];
    arr[i] = v;
    onChange({ [key]: arr } as Partial<LiderCarismatico>);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="🎭 Personalidad">
          <ListField
            label="Tus 2 arquetipos de personalidad predominantes"
            hint="Ej: El Sabio, El Héroe, El Cuidador, El Rebelde..."
            values={data.arquetipos}
            onChange={(i, v) => updateList('arquetipos', i, v)}
            placeholder="Arquetipo..."
          />
          <ListField
            label="Palabras que te definen"
            values={data.palabrasQueDefinen}
            onChange={(i, v) => updateList('palabrasQueDefinen', i, v)}
            placeholder="Ej: Auténtica, Directa..."
          />
        </Card>

        <Card title="🎨 Identidad Visual">
          <ListField
            label="Colores de tu marca"
            values={data.colores}
            onChange={(i, v) => updateList('colores', i, v)}
            placeholder="Ej: Lila, Blanco..."
          />
          <ListField
            label="Imagen / estilo personal"
            values={data.imagen}
            onChange={(i, v) => updateList('imagen', i, v)}
            placeholder="Ej: Swéter + gorra..."
          />
          <ListField
            label="Símbolos que te representan"
            values={data.simbolos}
            onChange={(i, v) => updateList('simbolos', i, v)}
            placeholder="Ej: Libros, tazas..."
          />
        </Card>
      </div>

      <Card title="📖 Tu Historia">
        <Field label="Cuenta tu historia de origen" hint="De dónde venís, qué viviste, cómo llegaste aquí">
          <Textarea
            value={data.historia}
            onChange={e => onChange({ historia: e.target.value })}
            placeholder="Empecé cuando..."
            rows={5}
          />
        </Field>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card title="🧱 Obstáculos superados">
          <ListField
            label="Lo que tuviste que vencer"
            values={data.obstaculos}
            onChange={(i, v) => updateList('obstaculos', i, v)}
            placeholder="Obstáculo..."
          />
        </Card>
        <Card title="👥 Personajes de tu historia">
          <ListField
            label="Quiénes aparecen en tu narrativa"
            values={data.personajes}
            onChange={(i, v) => updateList('personajes', i, v)}
            placeholder="Ej: Mi mentora, mi hijo..."
          />
        </Card>
        <Card title="🏆 Logros que inspiran">
          <Field label="Hitos que demuestran que funciona">
            <div className="space-y-2">
              {data.logros.map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-yellow-400 text-sm">⭐</span>
                  <Input
                    value={v}
                    onChange={e => updateList('logros', i, e.target.value)}
                    placeholder={`Logro ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </Field>
        </Card>
      </div>
    </div>
  );
}
