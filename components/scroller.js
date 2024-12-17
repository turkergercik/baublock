'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const ScrollRestorationProvider = ({ children }) => {
  const pathname = usePathname();
  const scrollData = useRef({}); // Stores scroll positions and heights

  useEffect(() => {
    // Load saved scroll data from localStorage
    const savedData = JSON.parse(localStorage.getItem('scrollData') || '{}');
    scrollData.current = savedData;

    // Restore scroll position
    const restoreScrollPosition = () => {
      const { scrollY = 0, scrollHeight = 0 } = scrollData.current[pathname] || {};

      // Check if the current height is sufficient to restore the scroll
      if (document.body.scrollHeight >= scrollHeight) {
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
      } else {
        // Retry until the height is sufficient
        const intervalId = setInterval(() => {
          if (document.body.scrollHeight >= scrollHeight) {
            console.log("bok")
            window.scrollTo({ top: scrollY, behavior: 'smooth' });
            clearInterval(intervalId);
          }
        }, 100); // Retry every 100ms
      }
    };

    // Trigger restoration on route change
    restoreScrollPosition();

    // Save scroll position and height on scroll
    const handleScroll = () => {
      scrollData.current[pathname] = {
        scrollY: window.scrollY,
        scrollHeight: document.body.scrollHeight,
      };
      localStorage.setItem('scrollData', JSON.stringify(scrollData.current));
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Cleanup event listener
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollRestorationProvider;
