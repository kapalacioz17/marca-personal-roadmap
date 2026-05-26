import { Plus, Trash2 } from 'lucide-react';
import type { Mercado, Competidor } from '../../types/roadmap';
import { Card, Field, Input } from '../ui/Field';

interface Props {
  data: Mercado;
  onChange: (updates: Partial<Mercado>) => void;
}

export function MercadoModule({ data, onChange }: Props) {
  const addCompetidor = () => {
    onChange({
      competidores: [...data.competidores, { nombre: '', instagram: '', nicho: '', producto: '', observacion: '' }],
    });
  };

  const removeCompetidor = (i: number) => {
    onChange({ competidores: data.competidores.filter((_, idx) => idx !== i) });
  };

  const updateCompetidor = (i: number, field: keyof Competidor, value: string) => {
    const arr = [...data.competidores];
    arr[i] = { ...arr[i], [field]: value };
    onChange({ competidores: arr });
  };

  return (
    <div className="space-y-5">
      <Card title="Tu nicho">
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <Field label="Mercado">
              <Input
                value={data.mercado}
                onChange={e => onChange({ mercado: e.target.value })}
                placeholder="Ej: Dinero"
              />
            </Field>
            <div className="absolute top-1/2 -right-3 text-slate-500 text-lg translate-y-2">→</div>
          </div>
          <div className="relative">
            <Field label="Nicho">
              <Input
                value={data.nicho}
                onChange={e => onChange({ nicho: e.target.value })}
                placeholder="Ej: Finanzas personales"
              />
            </Field>
            <div className="absolute top-1/2 -right-3 text-slate-500 text-lg translate-y-2">→</div>
          </div>
          <Field label="Micronicho">
            <Input
              value={data.micronicho}
              onChange={e => onChange({ micronicho: e.target.value })}
              placeholder="Ej: Educación online para mamás"
            />
          </Field>
        </div>
        {data.mercado && data.nicho && data.micronicho && (
          <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-xs text-purple-300">
              ✅ Tu micronicho: <strong className="text-white">{data.mercado} → {data.nicho} → {data.micronicho}</strong>
            </p>
          </div>
        )}
      </Card>

      <Card title="Análisis de competidores">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#2a2a3e]">
                {['Nombre', 'Instagram', 'Nicho', 'Producto', 'Observación', ''].map(h => (
                  <th key={h} className="text-left text-slate-500 font-semibold pb-2 pr-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-2">
              {data.competidores.map((c, i) => (
                <tr key={i} className="border-b border-[#2a2a3e]/50">
                  {(['nombre', 'instagram', 'nicho', 'producto', 'observacion'] as (keyof Competidor)[]).map(field => (
                    <td key={field} className="py-2 pr-2">
                      <Input
                        value={c[field]}
                        onChange={e => updateCompetidor(i, field, e.target.value)}
                        placeholder={field}
                      />
                    </td>
                  ))}
                  <td className="py-2">
                    <button
                      onClick={() => removeCompetidor(i)}
                      className="text-slate-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addCompetidor}
          className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 mt-2 transition-colors"
        >
          <Plus size={14} />
          Agregar competidor
        </button>
      </Card>
    </div>
  );
}
