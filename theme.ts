import { useEffect } from 'react';

// Theme type
export type Theme = 'light' | 'dark';

// Apply theme to document
export const applyTheme = (theme: Theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Hook to manage theme
export const useTheme = (theme: Theme) => {
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
};