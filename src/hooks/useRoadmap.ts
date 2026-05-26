import { useState, useEffect, useCallback } from 'react';
import type { RoadmapData, Idea } from '../types/roadmap';
import { demoData, emptyData } from '../data/demoData';

const STORAGE_KEY = 'marca-personal-roadmap';

// Merge superficial de propiedades escalares/objeto — no se usa sobre arrays
function shallowMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key in source) {
    const val = source[key];
    if (val !== undefined) {
      (result as Record<string, unknown>)[key] = val;
    }
  }
  return result;
}

function safeParseRoadmap(raw: string): RoadmapData | null {
  try {
    const parsed = JSON.parse(raw) as Partial<RoadmapData>;
    // Validación mínima de estructura
    if (
      typeof parsed !== 'object' ||
      !parsed.visionDigital ||
      !parsed.mercado ||
      !parsed.avatar
    ) return null;
    // Rellenar campos que podrían faltar de versiones anteriores
    return {
      ...demoData,
      ...parsed,
    };
  } catch {
    return null;
  }
}

export function useRoadmap() {
  const [data, setData] = useState<RoadmapData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = safeParseRoadmap(saved);
      if (parsed) return parsed;
    }
    return demoData;
  });

  const [isDemo, setIsDemo] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return !saved;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Actualiza secciones tipo objeto (todos los módulos excepto ideas)
  const updateSection = useCallback(<K extends Exclude<keyof RoadmapData, 'ideas'>>(
    section: K,
    updates: Partial<RoadmapData[K]>
  ) => {
    setData(prev => ({
      ...prev,
      [section]: shallowMerge(prev[section] as object, updates as object),
    }));
    setIsDemo(false);
  }, []);

  // Setter dedicado para ideas (array de primer nivel)
  const updateIdeas = useCallback((ideas: Idea[]) => {
    setData(prev => ({ ...prev, ideas }));
    setIsDemo(false);
  }, []);

  const loadDemo = useCallback(() => {
    setData(demoData);
    setIsDemo(true);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const resetToEmpty = useCallback(() => {
    setData(emptyData);
    setIsDemo(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const resetSection = useCallback(<K extends keyof RoadmapData>(section: K) => {
    setData(prev => ({ ...prev, [section]: emptyData[section] }));
    setIsDemo(false); // fix: resetSection también debe marcar como no-demo
  }, []);

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mi-marca-personal.json';
    document.body.appendChild(a); // fix: necesario para Firefox
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  const getProgress = useCallback((): Record<keyof RoadmapData, number> => {
    const countFilled = (obj: unknown): [number, number] => {
      if (typeof obj === 'string') return [obj.trim() !== '' ? 1 : 0, 1];
      if (typeof obj === 'number') return [obj > 0 ? 1 : 0, 1];
      if (Array.isArray(obj)) {
        const results = obj.map(item => countFilled(item));
        return [results.reduce((s, r) => s + r[0], 0), results.reduce((s, r) => s + r[1], 0)];
      }
      if (typeof obj === 'object' && obj !== null) {
        const results = Object.values(obj).map(v => countFilled(v));
        return [results.reduce((s, r) => s + r[0], 0), results.reduce((s, r) => s + r[1], 0)];
      }
      return [0, 1];
    };

    const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n)));

    // Para secciones con estructura fija, usar emptyData como denominador
    const fixedProgress = (key: Exclude<keyof RoadmapData, 'ideas'>) => {
      const denominator = countFilled(emptyData[key])[1];
      if (denominator === 0) return 0;
      return clamp((countFilled(data[key])[0] / denominator) * 100);
    };

    // ideas: progreso basado en cuántas tienen contenido (máx 100%)
    const ideasFilled = data.ideas.filter(i => i.contenido.trim() !== '').length;
    const ideasProgress = data.ideas.length === 0 ? 0 : clamp((ideasFilled / data.ideas.length) * 100);

    return {
      visionDigital: fixedProgress('visionDigital'),
      mercado: fixedProgress('mercado'),
      avatar: fixedProgress('avatar'),
      oferta: fixedProgress('oferta'),
      transformacion: fixedProgress('transformacion'),
      liderCarismatico: fixedProgress('liderCarismatico'),
      movimiento: fixedProgress('movimiento'),
      contenido: fixedProgress('contenido'),
      ideas: ideasProgress,
    };
  }, [data]);

  return { data, isDemo, updateSection, updateIdeas, loadDemo, resetToEmpty, resetSection, exportData, getProgress };
}
