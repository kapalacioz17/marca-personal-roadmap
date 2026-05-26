import type { Avatar } from '../../types/roadmap';
import { Card, Field, Input, ListField } from '../ui/Field';

interface Props {
  data: Avatar;
  onChange: (updates: Partial<Avatar>) => void;
}

export function AvatarModule({ data, onChange }: Props) {
  const updateList = (key: keyof Avatar, i: number, v: string) => {
    const arr = [...(data[key] as string[])];
    arr[i] = v;
    onChange({ [key]: arr } as Partial<Avatar>);
  };

  return (
    <div className="space-y-5">
      <Card title="Datos demográficos">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Rango de edad">
            <Input value={data.rangoEdad} onChange={e => onChange({ rangoEdad: e.target.value })} placeholder="Ej: 25 - 35" />
          </Field>
          <Field label="Sexo">
            <Input value={data.sexo} onChange={e => onChange({ sexo: e.target.value })} placeholder="Ej: Mujeres" />
          </Field>
          <Field label="Rango de ingresos">
            <Input value={data.rangoIngresos} onChange={e => onChange({ rangoIngresos: e.target.value })} placeholder="Ej: $300 - $500" />
          </Field>
          <Field label="Países principales">
            <Input value={data.paises} onChange={e => onChange({ paises: e.target.value })} placeholder="Ej: Colombia, Venezuela" />
          </Field>
          <Field label="Ocupación">
            <Input value={data.ocupacion} onChange={e => onChange({ ocupacion: e.target.value })} placeholder="Ej: Ama de casa" />
          </Field>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="😰 Dolores">
          <ListField
            label="Situaciones que le hacen sentir mal y que evita"
            values={data.dolores}
            onChange={(i, v) => updateList('dolores', i, v)}
            placeholder="Dolor o miedo..."
          />
        </Card>

        <Card title="🌟 Sueños (mediano - largo plazo)">
          <ListField
            label="Lo que sueña lograr"
            values={data.suenos}
            onChange={(i, v) => updateList('suenos', i, v)}
            placeholder="Sueño..."
          />
        </Card>

        <Card title="🎯 Metas / Objetivos (corto - mediano plazo)">
          <ListField
            label="Qué quiere lograr pronto"
            values={data.metas}
            onChange={(i, v) => updateList('metas', i, v)}
            placeholder="Meta concreta..."
          />
        </Card>

        <Card title="⚠️ Errores comunes del avatar">
          <ListField
            label="Lo que tu avatar hace mal y tú puedes corregir"
            values={data.erroresComunes}
            onChange={(i, v) => updateList('erroresComunes', i, v)}
            placeholder="Error frecuente..."
          />
        </Card>
      </div>
    </div>
  );
}
