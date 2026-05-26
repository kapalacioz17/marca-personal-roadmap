import { Plus, Trash2 } from 'lucide-react';
import type { Idea } from '../../types/roadmap';
import { Card, Input } from '../ui/Field';

interface Props {
  data: Idea[];
  onChange: (ideas: Idea[]) => void;
}

export function IdeasModule({ data, onChange }: Props) {
  const add = () => {
    onChange([...data, { id: Date.now().toString(), link: '', contenido: '', cuentas: '', historias: '' }]);
  };

  const remove = (id: string) => onChange(data.filter(i => i.id !== id));

  const update = (id: string, field: keyof Idea, value: string) => {
    onChange(data.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  return (
    <div className="space-y-5">
      <Card title="💡 Banco de Ideas">
        <p className="text-xs text-slate-500">
          Guardá ideas de contenido: referencias, links, cuentas que te inspiran, historias que querés contar.
        </p>

        <div className="space-y-3 mt-4">
          <div className="grid grid-cols-4 gap-3 px-1">
            {['Contenido / Idea', 'Link de referencia', 'Cuentas inspiradoras', 'Para Historias'].map(h => (
              <span key={h} className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</span>
            ))}
          </div>

          {data.map((idea) => (
            <div key={idea.id} className="grid grid-cols-4 gap-3 items-start bg-[#1a1a2e] rounded-lg p-3 border border-[#2a2a3e]">
              <Input
                value={idea.contenido}
                onChange={e => update(idea.id, 'contenido', e.target.value)}
                placeholder="¿Qué querés publicar?"
              />
              <Input
                value={idea.link}
                onChange={e => update(idea.id, 'link', e.target.value)}
                placeholder="https://..."
              />
              <Input
                value={idea.cuentas}
                onChange={e => update(idea.id, 'cuentas', e.target.value)}
                placeholder="@cuenta1, @cuenta2"
              />
              <div className="flex items-center gap-2">
                <Input
                  value={idea.historias}
                  onChange={e => update(idea.id, 'historias', e.target.value)}
                  placeholder="Idea para story..."
                />
                <button
                  onClick={() => remove(idea.id)}
                  className="text-slate-600 hover:text-red-400 transition-colors shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={add}
          className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 mt-2 transition-colors"
        >
          <Plus size={16} />
          Agregar idea
        </button>
      </Card>
    </div>
  );
}
