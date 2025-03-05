import React, { useEffect, useState } from 'react';
import { DarkModeIcon, LightModeIcon } from '@components/icons';
import useTheme from '@hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const [theme, themeToggle, themeLoading] = useTheme();
  const [icon, setIcon] = useState<'light' | 'dark'>(
    theme === 'light' ? 'light' : 'dark'
  );

  useEffect(() => {
    theme === 'light' ? setIcon('light') : setIcon('dark');
  }, [theme, themeLoading]); // force rerender on load if previously set to dark

  return (
    <div className="flex items-center ml-3">
      <button onClick={themeToggle} className="cursor-pointer">
        {icon === 'light' ? (
          <DarkModeIcon className="h-3/4 w-3/4" />
        ) : (
          <LightModeIcon className="h-3/4 w-3/4" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
