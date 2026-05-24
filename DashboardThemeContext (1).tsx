import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface Ctx {
  theme: Theme;
  toggleTheme: () => void;
}

const DashboardThemeContext = createContext<Ctx>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function DashboardThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem('dashboard-theme') as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('dashboard-theme', theme);
    const prevBg = document.body.style.background;
    document.body.style.background = theme === 'dark' ? '#0b0f1a' : '#f1f5f9';
    return () => {
      document.body.style.background = prevBg;
    };
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <DashboardThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DashboardThemeContext.Provider>
  );
}

export function useDashboardTheme() {
  return useContext(DashboardThemeContext);
}
