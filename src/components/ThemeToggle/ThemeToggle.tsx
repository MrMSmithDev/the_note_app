import React from 'react';
import DarkModeIcon from '@components/icons/DarkModeIcon';
import LightModeIcon from '@components/icons/LightModeIcon';
import useTheme from '@hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const [theme, themeToggle] = useTheme();

  return (
    <div className="flex items-center ml-3">
      <button onClick={themeToggle} className="cursor-pointer">
        {theme === 'light' ?  <DarkModeIcon className="h-3/4 w-3/4"/> : <LightModeIcon className="h-3/4 w-3/4"/>}
      </button>
    </div>
  );
};

export default ThemeToggle;
