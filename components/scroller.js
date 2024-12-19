'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef,useState } from 'react';
import { useAuthorization } from '@/app/contexts/authcontext';
const ScrollRestorationProvider = ({ children }) => {
  const {setopen}=useAuthorization()
  const pathname = usePathname();
  const scrollData = useRef({}); // Stores scroll positions and heights
  const lastscroll = useRef(0)
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    // Load saved scroll data from localStorage
    const savedData = JSON.parse(localStorage.getItem('scrollData') || '{}');
    scrollData.current = savedData;

    let isNavigating = false; // Flag to prevent overwriting during navigation

    // Function to restore scroll position
    const restoreScrollPosition = () => {
      const { scrollY = 0, scrollHeight = 0 } = scrollData.current[pathname] || {};

      if (document.body.scrollHeight >= scrollHeight) {
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
      } else {
        // Retry until the height is sufficient
        const intervalId = setInterval(() => {
          if (document.body.scrollHeight >= scrollHeight) {
            window.scrollTo({ top: scrollY, behavior: 'smooth' });
            clearInterval(intervalId);
          }
        }, 100);
      }
    };

    // Save current scroll data
    const saveScrollData = () => {
      if (!isNavigating) {
        
          
          

        scrollData.current[pathname] = {
          scrollY: window.scrollY,
          scrollHeight: document.body.scrollHeight,
        };
        localStorage.setItem('scrollData', JSON.stringify(scrollData.current));
      }
    };

    // Add scroll event listener
    const handleScroll = () => saveScrollData();
    window.addEventListener('scroll', handleScroll);
   

    // Detect navigation or unload
    const handleBeforeUnload = () => {
      console.log(window.scrollY,77775555)
    };
    const handleRouteChange = () => {
      isNavigating = true;
      saveScrollData();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleRouteChange);

    // Restore scroll position on route change
    restoreScrollPosition();

    return () => {
      // Cleanup event listeners
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [pathname]);
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
