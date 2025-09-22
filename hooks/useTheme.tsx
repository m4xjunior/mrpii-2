'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  themeColors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    shadow: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>('auto');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  // Update actual theme based on preference and system preference
  useEffect(() => {
    if (!mounted) return;

    const updateActualTheme = () => {
      if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setActualTheme(prefersDark ? 'dark' : 'light');
      } else {
        setActualTheme(theme);
      }
    };

    updateActualTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateActualTheme);

    return () => mediaQuery.removeEventListener('change', updateActualTheme);
  }, [theme, mounted]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    document.documentElement.setAttribute('data-theme', actualTheme);
    document.documentElement.classList.toggle('dark', actualTheme === 'dark');

    // Update CSS custom properties
    const root = document.documentElement;
    if (actualTheme === 'dark') {
      root.style.setProperty('--bg-primary', '#1a1a1a');
      root.style.setProperty('--bg-secondary', '#2d2d2d');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#a0a0a0');
      root.style.setProperty('--border-color', '#404040');
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8f9fa');
      root.style.setProperty('--text-primary', '#212529');
      root.style.setProperty('--text-secondary', '#6c757d');
      root.style.setProperty('--border-color', '#dee2e6');
    }
  }, [actualTheme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  const isDark = actualTheme === 'dark';

  const themeColors = {
    primary: isDark ? '#667eea' : '#5a67d8',
    secondary: isDark ? '#764ba2' : '#6b46c1',
    background: isDark ? '#1a1a1a' : '#ffffff',
    surface: isDark ? '#2d2d2d' : '#f8f9fa',
    text: isDark ? '#ffffff' : '#212529',
    textSecondary: isDark ? '#a0a0a0' : '#6c757d',
    border: isDark ? '#404040' : '#dee2e6',
    shadow: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)',
    success: isDark ? '#48bb78' : '#38a169',
    warning: isDark ? '#ed8936' : '#d69e2e',
    error: isDark ? '#f56565' : '#e53e3e',
    info: isDark ? '#4299e1' : '#3182ce',
  };

  if (!mounted) {
    // Return a default light theme during SSR
    return (
      <ThemeContext.Provider
        value={{
          theme: 'light',
          actualTheme: 'light',
          setTheme: () => {},
          isDark: false,
          themeColors: {
            primary: '#5a67d8',
            secondary: '#6b46c1',
            background: '#ffffff',
            surface: '#f8f9fa',
            text: '#212529',
            textSecondary: '#6c757d',
            border: '#dee2e6',
            shadow: 'rgba(0,0,0,0.08)',
            success: '#38a169',
            warning: '#d69e2e',
            error: '#e53e3e',
            info: '#3182ce',
          },
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        actualTheme,
        setTheme,
        isDark,
        themeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};