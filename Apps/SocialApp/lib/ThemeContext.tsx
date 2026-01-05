import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, ThemeColors } from './theme';
import { useAppearanceSettings } from '../stores/settingsStore';

type ThemeMode = 'dark' | 'light';

interface ThemeContextValue {
  colors: ThemeColors;
  isDark: boolean;
  mode: ThemeMode;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: darkColors,
  isDark: true,
  mode: 'dark',
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const appearance = useAppearanceSettings();
  const systemColorScheme = useColorScheme();

  const themeSetting = appearance?.theme ?? 'dark';

  const value = useMemo(() => {
    // Resolve the actual theme mode
    let mode: ThemeMode;

    if (themeSetting === 'system') {
      mode = systemColorScheme === 'light' ? 'light' : 'dark';
    } else {
      mode = themeSetting;
    }

    const isDark = mode === 'dark';
    const colors = isDark ? darkColors : lightColors;

    return { colors, isDark, mode };
  }, [themeSetting, systemColorScheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to get current theme colors
export function useThemeColors(): ThemeColors {
  const { colors } = useContext(ThemeContext);
  return colors;
}

// Hook to get full theme context
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
