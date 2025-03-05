import { useEffect, useState } from 'react';

type ThemeType = 'light' | 'dark';

const useTheme = (): [ThemeType | null, () => void, boolean] => {
  const [theme, setTheme] = useState<ThemeType | null>(null);
  const [themeLoading, setThemeLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    setTheme(savedTheme || systemTheme);
    setThemeLoading(false);
  }, []);

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.classList.remove(theme!);
    document.documentElement.classList.add(newTheme);

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return [theme, toggleTheme, themeLoading];
};

export default useTheme;
