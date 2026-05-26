import { useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import type { ModuleId } from './types/roadmap';
import { useRoadmap } from './hooks/useRoadmap';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { VisionModule } from './components/modules/VisionModule';
import { MercadoModule } from './components/modules/MercadoModule';
import { AvatarModule } from './components/modules/AvatarModule';
import { OfertaModule } from './components/modules/OfertaModule';
import { TransformacionModule } from './components/modules/TransformacionModule';
import { LiderModule } from './components/modules/LiderModule';
import { MovimientoModule } from './components/modules/MovimientoModule';
import { ContenidoModule } from './components/modules/ContenidoModule';
import { IdeasModule } from './components/modules/IdeasModule';
import { DashboardModule } from './components/modules/DashboardModule';

const MODULE_META: Record<ModuleId, { emoji: string; title: string }> = {
  dashboard: { emoji: '📊', title: 'Dashboard — Vista General' },
  vision: { emoji: '🎯', title: 'Visión Digital' },
  mercado: { emoji: '🏪', title: 'Mercado' },
  avatar: { emoji: '👤', title: 'Avatar' },
  oferta: { emoji: '💎', title: 'Oferta / Escalera de Valor' },
  transformacion: { emoji: '✨', title: 'Transformación' },
  lider: { emoji: '🦁', title: 'Líder Carismático' },
  movimiento: { emoji: '🔥', title: 'Movimiento' },
  contenido: { emoji: '📱', title: 'Estrategia de Contenido' },
  ideas: { emoji: '💡', title: 'Banco de Ideas' },
};

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelect = useCallback((id: ModuleId) => {
    setActiveModule(id);
    setSidebarOpen(false); // cierra en mobile al navegar
  }, []);
  const { data, isDemo, updateSection, updateIdeas, loadDemo, resetToEmpty, resetSection, exportData, getProgress } = useRoadmap();
  const progress = getProgress();
  const { emoji, title } = MODULE_META[activeModule];

  const handleResetSection = () => {
    if (activeModule === 'dashboard') return;
    if (!confirm(`¿Limpiar el módulo "${title}"? No se puede deshacer.`)) return;
    const sectionMap: Partial<Record<ModuleId, keyof typeof data>> = {
      vision: 'visionDigital',
      mercado: 'mercado',
      avatar: 'avatar',
      oferta: 'oferta',
      transformacion: 'transformacion',
      lider: 'liderCarismatico',
      movimiento: 'movimiento',
      contenido: 'contenido',
      ideas: 'ideas',
    };
    const key = sectionMap[activeModule];
    if (key) resetSection(key);
  };

  const handleReset = () => {
    if (confirm('¿Empezar un nuevo roadmap desde cero? Esto borrará todos los datos actuales.')) {
      resetToEmpty();
      setActiveModule('dashboard');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar: visible en md+, oculto en mobile salvo que esté abierto */}
      <div className={`${sidebarOpen ? 'fixed inset-0 z-40 flex' : 'hidden md:flex'}`}
           onClick={e => { if (e.target === e.currentTarget) setSidebarOpen(false); }}>
        {sidebarOpen && <div className="absolute inset-0 bg-black/60 -z-10" onClick={() => setSidebarOpen(false)} />}
        <Sidebar active={activeModule} onSelect={handleSelect} progress={progress} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Botón hamburguesa solo en mobile */}
        <div className="md:hidden flex items-center gap-3 px-4 py-2" style={{ background: 'rgba(7,7,18,0.97)', borderBottom: '1px solid rgba(124,58,237,0.14)' }}>
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="text-slate-400 hover:text-white p-1"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="text-white font-semibold text-sm">{emoji} {title}</span>
        </div>

        <Header
          title={title}
          emoji={emoji}
          isDemo={isDemo}
          onLoadDemo={loadDemo}
          onReset={handleReset}
          onExport={exportData}
          onResetSection={handleResetSection}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {activeModule === 'dashboard' && (
            <DashboardModule data={data} progress={progress} onNavigate={setActiveModule} />
          )}
          {activeModule === 'vision' && (
            <VisionModule data={data.visionDigital} onChange={u => updateSection('visionDigital', u)} />
          )}
          {activeModule === 'mercado' && (
            <MercadoModule data={data.mercado} onChange={u => updateSection('mercado', u)} />
          )}
          {activeModule === 'avatar' && (
            <AvatarModule data={data.avatar} onChange={u => updateSection('avatar', u)} />
          )}
          {activeModule === 'oferta' && (
            <OfertaModule data={data.oferta} onChange={u => updateSection('oferta', u)} />
          )}
          {activeModule === 'transformacion' && (
            <TransformacionModule data={data.transformacion} onChange={u => updateSection('transformacion', u)} />
          )}
          {activeModule === 'lider' && (
            <LiderModule data={data.liderCarismatico} onChange={u => updateSection('liderCarismatico', u)} />
          )}
          {activeModule === 'movimiento' && (
            <MovimientoModule data={data.movimiento} onChange={u => updateSection('movimiento', u)} />
          )}
          {activeModule === 'contenido' && (
            <ContenidoModule data={data.contenido} onChange={u => updateSection('contenido', u)} />
          )}
          {activeModule === 'ideas' && (
            <IdeasModule data={data.ideas} onChange={updateIdeas} />
          )}
        </main>
      </div>
    </div>
  );
}
