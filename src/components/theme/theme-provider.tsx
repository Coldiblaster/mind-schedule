'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme | undefined; // Theme pode ser undefined durante o carregamento
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: undefined,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'mind-schedule-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme | undefined>(undefined);

  // Helper para verificar se estamos no lado do cliente
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (!isClient) return;

    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      setThemeState(defaultTheme);
    }
  }, [isClient, defaultTheme, storageKey]);

  useEffect(() => {
    if (!isClient || theme === undefined) return; // Aguarde até o tema ser carregado

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, isClient]);

  const setTheme = (newTheme: Theme) => {
    if (!isClient) return;

    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  if (theme === undefined) {
    // Opcional: renderizar um fallback enquanto o tema carrega
    return null;
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
