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
  const cleanupTimeout = useRef(null);
  const isNavigating = useRef(false);
  const lastPathname = useRef(pathname);
  const isMobile = () => window.innerWidth <= 768;
  const getTotalHeight = () => document.body.scrollHeight;
  // Reset function to clear all states and timeouts
  const resetState = () => {
    setIsLoading(false);
    isRestoring.current = false;
    isNavigating.current = false;
    clearTimeout(retryTimeout.current);
    clearTimeout(cleanupTimeout.current);
  };

  // Handle navigation changes
  useEffect(() => {
    if (lastPathname.current !== pathname) {
      isNavigating.current = true;
      resetState();
      lastPathname.current = pathname;
    }

    return resetState;
  }, [pathname]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('scrollData') || '{}');
    scrollData.current = savedData;

    // Only proceed if we're not in the middle of navigation
    if (isNavigating.current) {
      isNavigating.current = false;
      return;
    }

    const hasStoredPosition = savedData[pathname]?.scrollY > 0;
    setIsLoading(hasStoredPosition);

    const restoreScrollPosition = () => {
      const { scrollY = 0, scrollHeight = 0 } = scrollData.current[pathname] || {};
      let attempts = 0;
      const MAX_ATTEMPTS = 30;

      const progressiveScroll = () => {
        // Don't continue if we're navigating
        if (isNavigating.current) {
          resetState();
          return;
        }

        if (attempts >= MAX_ATTEMPTS) {
          resetState();
          return;
        }
        attempts++;

        try {
          const currentHeight = getTotalHeight();
          const currentScroll = window.scrollY;
          const isMobile = window.innerWidth <= 768;
          const scrollChunk = isMobile ? 300 : 1000;

          const nextScrollPosition = Math.min(
            currentScroll + scrollChunk,
            scrollY
          );

          window.scrollTo({
            top: nextScrollPosition,
            behavior: 'instant'
          });

          retryTimeout.current = setTimeout(() => {
            try {
              const newHeight = getTotalHeight();

              if (nextScrollPosition < scrollY && newHeight > currentHeight) {
                progressiveScroll();
              } else if (nextScrollPosition >= scrollY) {
                cleanupTimeout.current = setTimeout(() => {
                  try {
                    window.scrollTo({
                      top: scrollY,
                      behavior: 'instant'
                    });
                    resetState();
                  } catch (error) {
                    resetState();
                  }
                }, isMobile ? 150 : 0);
              } else {
                resetState();
              }
            } catch (error) {
              resetState();
            }
          }, isMobile ? 250 : 100);
        } catch (error) {
          resetState();
        }
      };

      if (hasStoredPosition) {
        setTimeout(progressiveScroll, isMobile ? 500 : 300);
      } else {
        resetState();
      }
    };

    const saveScrollData = () => {
      if (!isRestoring.current && !isNavigating.current) {
        try {
          scrollData.current[pathname] = {
            scrollY: window.scrollY,
            scrollHeight: getTotalHeight(),
          };
          localStorage.setItem('scrollData', JSON.stringify(scrollData.current));
        } catch (error) {
          console.error('Error saving scroll position:', error);
        }
      }
    };

    const handleScroll = () => {
      if (!isNavigating.current) {
        saveScrollData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    restoreScrollPosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      resetState();
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

  return <>
  {isLoading && (
        <div className="fixed flex justify-center items-center bg-black bg-opacity-70 right-0 top-0 h-screen left-0 z-20">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
  {children}</>;
};

export default ScrollRestorationProvider;
