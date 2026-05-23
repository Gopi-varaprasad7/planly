'use client';

import { useState, useEffect } from 'react';
import { themeRepo } from '@/lib/storage';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => themeRepo.get());

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    themeRepo.set(theme);
  }, [theme]);
  return {
    theme,
    setTheme,
    toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
  };
}
