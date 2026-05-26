import type { Oferta } from '../../types/roadmap';
import { Card, Field, Input, ListField } from '../ui/Field';

interface Props {
  data: Oferta;
  onChange: (updates: Partial<Oferta>) => void;
}

export function OfertaModule({ data, onChange }: Props) {
  const lt = data.productoLowTicket;

  return (
    <div className="space-y-5">
      {/* Escalera de Valor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-500/30" title="🆓 Producto Gratuito">
          <Field label="Lead Magnet">
            <Input
              value={data.productoGratuito}
              onChange={e => onChange({ productoGratuito: e.target.value })}
              placeholder="Ej: Guía gratuita..."
            />
          </Field>
          <div className="mt-2 text-center">
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Precio: $0</span>
          </div>
        </Card>

        <Card className="border-purple-500/40" title="🎟️ Producto Low Ticket">
          <Field label="Nombre del producto">
            <Input
              value={lt.nombre}
              onChange={e => onChange({ productoLowTicket: { ...lt, nombre: e.target.value } })}
              placeholder="Ej: Workshop..."
            />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Precio">
              <Input
                value={lt.precio}
                onChange={e => onChange({ productoLowTicket: { ...lt, precio: e.target.value } })}
                placeholder="Ej: $17"
              />
            </Field>
            <Field label="Duración">
              <Input
                value={lt.duracion}
                onChange={e => onChange({ productoLowTicket: { ...lt, duracion: e.target.value } })}
                placeholder="Ej: 2 días"
              />
            </Field>
          </div>
        </Card>

        <Card className="border-yellow-500/30" title="👑 Producto High Ticket">
          <Field label="Nombre del producto">
            <Input
              value={data.productoHighTicket}
              onChange={e => onChange({ productoHighTicket: e.target.value })}
              placeholder="Ej: Mentoría 1:1..."
            />
          </Field>
          <div className="mt-2 text-center">
            <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">Premium ✨</span>
          </div>
        </Card>
      </div>

      {/* Detalle del Low Ticket */}
      <Card title={`Detalle de "${lt.nombre || 'tu Low Ticket'}"`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ListField
            label="Módulos"
            values={lt.modulos}
            onChange={(i, v) => {
              const arr = [...lt.modulos]; arr[i] = v;
              onChange({ productoLowTicket: { ...lt, modulos: arr } });
            }}
            placeholder="Ej: Módulo 1 — Tu Nueva Realidad"
          />
          <ListField
            label="Bonuses"
            values={lt.bonuses}
            onChange={(i, v) => {
              const arr = [...lt.bonuses]; arr[i] = v;
              onChange({ productoLowTicket: { ...lt, bonuses: arr } });
            }}
            placeholder="Ej: Bonus 1 — Checklist..."
          />
        </div>
      </Card>
    </div>
  );
}
