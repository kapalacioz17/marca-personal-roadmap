import type { Transformacion } from '../../types/roadmap';
import { Card, Field, Input, Textarea } from '../ui/Field';

interface Props {
  data: Transformacion;
  onChange: (updates: Partial<Transformacion>) => void;
}

export function TransformacionModule({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="❌ Gran Problema">
          <Field label="¿Cuál es el gran problema de tu avatar?" hint="El dolor más profundo que resuelves">
            <Textarea
              value={data.granProblema}
              onChange={e => onChange({ granProblema: e.target.value })}
              placeholder="El gran problema es que..."
              rows={5}
            />
          </Field>
        </Card>

        <Card title="✅ Transformación Final">
          <Field label="¿Cómo queda tu avatar después de trabajar contigo?" hint="El resultado ideal, el sueño hecho realidad">
            <Textarea
              value={data.transformacionFinal}
              onChange={e => onChange({ transformacionFinal: e.target.value })}
              placeholder="Después de trabajar conmigo, mi cliente..."
              rows={5}
            />
          </Field>
        </Card>
      </div>

      <Card title="🛸 Tu Vehículo Único">
        <Field
          label="¿Cuál es tu método, sistema o enfoque único?"
          hint="Lo que te diferencia de otros en tu nicho — tu forma propia de llevar al cliente de A a B"
        >
          <Input
            value={data.vehiculoUnico}
            onChange={e => onChange({ vehiculoUnico: e.target.value })}
            placeholder="Ej: El Método ORBIT, El Sistema de los 3 Pasos, Dibujo Terapéutico..."
          />
        </Field>
      </Card>

      <Card title="💬 Promesa de Transformación">
        <Field
          label="Tu promesa en una oración"
          hint='Formato: "Ayudo a [AVATAR] a [RESULTADO] a través de [VEHÍCULO]"'
        >
          <Textarea
            value={data.promesa}
            onChange={e => onChange({ promesa: e.target.value })}
            placeholder="Ayudo a _______ a _______ a través de _______."
            rows={3}
          />
        </Field>
        {data.promesa && (
          <div className="mt-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
            <p className="text-sm text-white font-medium text-center italic">"{data.promesa}"</p>
          </div>
        )}
      </Card>
    </div>
  );
}
