'use client';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'bi_visitor_name';

export function useVisitorName() {
  const [name, setNameState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setNameState(stored);
    } catch {}
  }, []);

  function saveName(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    try {
      localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {}
    setNameState(trimmed);
  }

  function clearName() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setNameState(null);
  }

  return { name, saveName, clearName };
}
