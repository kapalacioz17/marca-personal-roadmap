import { Target, Store, User, Gift, Sparkles, Crown, Flame, Video, Lightbulb, LayoutDashboard } from 'lucide-react';
import type { ModuleId } from '../../types/roadmap';

interface SidebarItem {
  id: ModuleId;
  label: string;
  icon: React.ReactNode;
  emoji: string;
}

const items: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, emoji: '📊' },
  { id: 'vision', label: 'Visión Digital', icon: <Target size={16} />, emoji: '🎯' },
  { id: 'mercado', label: 'Mercado', icon: <Store size={16} />, emoji: '🏪' },
  { id: 'avatar', label: 'Avatar', icon: <User size={16} />, emoji: '👤' },
  { id: 'oferta', label: 'Oferta', icon: <Gift size={16} />, emoji: '💎' },
  { id: 'transformacion', label: 'Transformación', icon: <Sparkles size={16} />, emoji: '✨' },
  { id: 'lider', label: 'Líder Carismático', icon: <Crown size={16} />, emoji: '🦁' },
  { id: 'movimiento', label: 'Movimiento', icon: <Flame size={16} />, emoji: '🔥' },
  { id: 'contenido', label: 'Contenido', icon: <Video size={16} />, emoji: '📱' },
  { id: 'ideas', label: 'Ideas', icon: <Lightbulb size={16} />, emoji: '💡' },
];

interface SidebarProps {
  active: ModuleId;
  onSelect: (id: ModuleId) => void;
  progress: Record<string, number>;
}

export function Sidebar({ active, onSelect, progress }: SidebarProps) {
  const moduleItems = items.filter(i => i.id !== 'dashboard');
  const totalProgress = Math.round(
    moduleItems.reduce((sum, item) => sum + (progress[item.id === 'lider' ? 'liderCarismatico' : item.id] ?? 0), 0) /
    moduleItems.length
  );

  return (
    <aside className="w-64 shrink-0 bg-[#13131f] border-r border-[#2a2a3e] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-[#2a2a3e]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs">🚀</div>
          <span className="font-bold text-white text-sm">Marca Personal</span>
        </div>
        <p className="text-xs text-slate-500 pl-9">Roadmap interactivo</p>
      </div>

      {/* Progress total */}
      <div className="px-5 py-3 border-b border-[#2a2a3e]">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Progreso total</span>
          <span className="text-purple-400 font-semibold">{totalProgress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#2a2a3e]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {items.map(item => {
          const progressKey = item.id === 'lider' ? 'liderCarismatico' : item.id;
          const pct = item.id === 'dashboard' ? totalProgress : (progress[progressKey] ?? 0);
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all group ${
                isActive
                  ? 'bg-purple-500/15 text-white border-r-2 border-purple-500'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'}>
                {item.icon}
              </span>
              <span className="text-sm flex-1">{item.label}</span>
              {item.id !== 'dashboard' && (
                <span className={`text-xs font-medium ${
                  pct >= 80 ? 'text-green-400' : pct >= 40 ? 'text-yellow-400' : 'text-slate-600'
                }`}>
                  {pct}%
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#2a2a3e]">
        <p className="text-xs text-slate-600 text-center">Guardado automáticamente 💾</p>
      </div>
    </aside>
  );
}
