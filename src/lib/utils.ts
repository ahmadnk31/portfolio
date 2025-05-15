
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

// Simple admin check that uses local storage
export const isAdmin = () => {
  if (typeof window === "undefined") return false;
  
  try {
    // Check if a recent successful login was recorded in session storage
    const recentLogin = sessionStorage.getItem('admin_login_success');
    if (recentLogin === 'true') {
      // Clear the flag but return true for this check
      console.log("Found recent successful login");
      sessionStorage.removeItem('admin_login_success');
      return true;
    }
    
    // This is a simple implementation - in a real application, you would use 
    // a more secure authentication method like JWT tokens or session cookies
    const adminKey = localStorage.getItem('portfolio_admin_key');
    
    // Your predefined admin key - in a real app, this should be a secure comparison
    // on the server-side using environment variables
    const validAdminKey = process.env.NEXT_PUBLIC_ADMIN_KEY || 'ahmadullah_nekzad_admin'; 
    
    const isValidAdmin = adminKey === validAdminKey;
    console.log("Admin status check:", isValidAdmin ? "Authorized" : "Not authorized");
    
    return isValidAdmin;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Helper to log out admin user
export const logoutAdmin = () => {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem('portfolio_admin_key');
    
    // Dispatch storage event to notify other components
    window.dispatchEvent(new StorageEvent('storage', { 
      key: 'portfolio_admin_key',
      oldValue: 'logged-in',
      newValue: null
    }));
    
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
};

