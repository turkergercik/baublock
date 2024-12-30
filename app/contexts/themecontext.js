'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export function ThemeProvider({ children }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState(getRouteConfig(pathname));

  function getRouteConfig(path) {
    switch (true) {
      case path.includes('news'):
        return {
          bgColor: 'bg-gradient-to-t from-[#e57100] to-[#000000]',
          textColor: 'text-white',
          borderColor: 'border-white',
          logo: '/assets/news.png',
          navbarBg: 'bg-black bg-opacity-70',
          title: 'BlockchainIST News'
        };
      case path.includes('research'):
        return {
          bgColor: 'bg-purple-900',
          textColor: 'text-white',
          borderColor: 'border-white',
          logo: '/assets/research.png',
          navbarBg: 'bg-black bg-opacity-70',
          title: 'BlockchainIST Research'
        };
      case path.includes('academy'):
        return {
          bgColor: 'bg-gradient-to-t from-[#552583] to-[#000000]',
          textColor: 'text-white',
          borderColor: 'border-white',
          logo: '/assets/logo2.png',
          navbarBg: 'bg-black bg-opacity-70',
          title: 'BlockchainIST Academy'
        };
      default:
        return {
          bgColor: 'bg-gray-900',
          textColor: 'text-white',
          borderColor: 'border-b-white',
          logo: '/assets/logo2.png',
          navbarBg: '',
          title: 'BlockchainIST Center'
        };
    }
  }

  useEffect(() => {
    setTheme(getRouteConfig(pathname));
  }, [pathname]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
} 