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
  const [isLoading, setIsLoading] = useState(true);
  const isRestoring = useRef(false); // Prevent saving while restoring scroll
  const retryTimeout = useRef(null); // Timeout for retrying scroll restoration

  useEffect(() => {
    // Load saved scroll data from localStorage
    const savedData = JSON.parse(localStorage.getItem('scrollData') || '{}');
    scrollData.current = savedData;

    // Reset loading state whenever the pathname changes
    setIsLoading(true);

    // Function to restore scroll position with smooth scrolling
    const restoreScrollPosition = () => {
      const { scrollY = 0, scrollHeight = 0 } = scrollData.current[pathname] || {};

      const attemptScroll = () => {
        if (document.body.scrollHeight >= scrollHeight) {
          window.scrollTo({
            top: scrollY,
            behavior: 'smooth',
          });
          setIsLoading(false); // Done restoring, hide spinner
          isRestoring.current = false; // Done restoring
          clearTimeout(retryTimeout.current); // Clear any ongoing retry timeout
        } else {
          // Retry after a delay for dynamic content loading
          retryTimeout.current = setTimeout(attemptScroll, 200);
        }
      };

      attemptScroll();
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

    // Wait for content to fully load
    if (document.readyState === 'complete') {
      restoreScrollPosition();
    } else {
      window.addEventListener('load', restoreScrollPosition);
    }

    return () => {
      // Cleanup scroll listener and retry timeout
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', restoreScrollPosition);
      clearTimeout(retryTimeout.current);
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
