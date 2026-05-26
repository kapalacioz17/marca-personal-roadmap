import { useState, useEffect, useCallback } from 'react';
import type { RoadmapData } from '../types/roadmap';
import { demoData, emptyData } from '../data/demoData';

const STORAGE_KEY = 'marca-personal-roadmap';

function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key in source) {
    const val = source[key];
    if (val !== undefined && val !== null) {
      (result as Record<string, unknown>)[key] = val;
    }
  }
  return result;
}

export function useRoadmap() {
  const [data, setData] = useState<RoadmapData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return demoData;
  });

  const [isDemo, setIsDemo] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return !saved;
    } catch {}
    return true;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateSection = useCallback(<K extends keyof RoadmapData>(
    section: K,
    updates: Partial<RoadmapData[K]>
  ) => {
    setData(prev => ({
      ...prev,
      [section]: deepMerge(prev[section], updates as Partial<RoadmapData[K]>),
    }));
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
  }, []);

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mi-marca-personal.json';
    a.click();
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

    return {
      visionDigital: Math.round((countFilled(data.visionDigital)[0] / countFilled(emptyData.visionDigital)[1]) * 100),
      mercado: Math.round((countFilled(data.mercado)[0] / countFilled(emptyData.mercado)[1]) * 100),
      avatar: Math.round((countFilled(data.avatar)[0] / countFilled(emptyData.avatar)[1]) * 100),
      oferta: Math.round((countFilled(data.oferta)[0] / countFilled(emptyData.oferta)[1]) * 100),
      transformacion: Math.round((countFilled(data.transformacion)[0] / countFilled(emptyData.transformacion)[1]) * 100),
      liderCarismatico: Math.round((countFilled(data.liderCarismatico)[0] / countFilled(emptyData.liderCarismatico)[1]) * 100),
      movimiento: Math.round((countFilled(data.movimiento)[0] / countFilled(emptyData.movimiento)[1]) * 100),
      contenido: Math.round((countFilled(data.contenido)[0] / countFilled(emptyData.contenido)[1]) * 100),
      ideas: data.ideas.length > 0 && data.ideas.some(i => i.contenido.trim() !== '') ? 80 : 0,
    };
  }, [data]);

  return { data, isDemo, updateSection, loadDemo, resetToEmpty, resetSection, exportData, getProgress };
}
