import { useState } from 'react';

type ThemeType = 'light' | 'dark';

const useTheme = (): [string, () => void] => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light')) as ThemeType;
    }
    return 'light';
  });

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return [theme, toggleTheme];
};

export default useTheme;
