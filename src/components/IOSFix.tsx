"use client";

import { useEffect } from 'react';

// This component adds iOS-specific fixes for scrolling issues
export const IOSFix = () => {
  useEffect(() => {
    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                 
    if (isIOS) {
      // Add iOS-specific class to html element
      document.documentElement.classList.add('ios');
      
      // iOS-specific scroll events handling
      const handleTouchMove = (e: TouchEvent) => {
        // Allow scrolling within elements that should scroll
        if ((e.target as Element)?.closest('.overflow-y-auto, .overflow-auto')) {
          return;
        }
        
        // Prevent body scrolling when sidebar is open
        if (document.body.classList.contains('body-scroll-lock')) {
          e.preventDefault();
        }
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      return () => {
        document.documentElement.classList.remove('ios');
        document.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, []);
  
  return null; // This component doesn't render anything
};
