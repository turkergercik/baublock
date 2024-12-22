'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef,useState } from 'react';
import { useAuthorization } from '@/app/contexts/authcontext';
const ScrollRestorationProvider = ({ children }) => {
  const {setopen}=useAuthorization()
  const pathname = usePathname();
  const scrollData = useRef({}); // Stores scroll positions and heights
  const [lastScrollY, setLastScrollY] = useState(0);
  const isRestoring = useRef(false); // Prevent saving while restoring scroll

  useEffect(() => {
    // Load saved scroll data from localStorage
    const savedData = JSON.parse(localStorage.getItem('scrollData') || '{}');
    scrollData.current = savedData;

    // Function to restore scroll position
    const restoreScrollPosition = () => {
      const { scrollY = 0, scrollHeight = 0 } = scrollData.current[pathname] || {};

      if (document.body.scrollHeight >= scrollHeight) {
        window.scrollTo(0, scrollY);
        isRestoring.current = false; // Done restoring
      } else {
        // Retry until the height is sufficient
        const intervalId = setInterval(() => {
          if (document.body.scrollHeight >= scrollHeight) {
            window.scrollTo(0, scrollY);
            clearInterval(intervalId);
            isRestoring.current = false; // Done restoring
          }
        }, 100);
      }
    };

    // Save current scroll data
    const saveScrollData = () => {
      if (!isRestoring.current) {
        scrollData.current[pathname] = {
          scrollY: window.scrollY,
          scrollHeight: document.body.scrollHeight,
        };
        localStorage.setItem('scrollData', JSON.stringify(scrollData.current));
      }
    };

    // Add scroll listener
    const handleScroll = () => saveScrollData();
    window.addEventListener('scroll', handleScroll);

    // Restore scroll on route change
    isRestoring.current = true;
    restoreScrollPosition();

    return () => {
      // Cleanup scroll listener
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]); // Triggered on every route change
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setopen(false)
        console.log("aşağı")
      } else if (currentScrollY < lastScrollY) {
        console.log("yukarı")
        setopen(true)
      }

      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return <>{children}</>;
};

export default ScrollRestorationProvider;
