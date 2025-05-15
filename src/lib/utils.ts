
export const isMobile = () => {
  if (typeof window === "undefined") return false;
  
  // Check width first (most reliable method)
  const width = window.innerWidth;
  if (width <= 1024) return true;
  
  // As a fallback, also check for touch capability for tablets
  const hasTouchScreen = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 || 
                         (navigator as any).msMaxTouchPoints > 0;
                         
  const isTabletSize = width <= 1180;
  
  // Return true if it's a touch device and in tablet size range
  return hasTouchScreen && isTabletSize;
};

