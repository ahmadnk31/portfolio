"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Don't run on server side
    if (typeof window === "undefined") return;
    
    // Only run once when component mounts
    let isMounted = true;
    
    // Add a small delay to ensure localStorage is available
    const timer = setTimeout(() => {
      if (!isMounted) return;
      
      // Check if user is admin
      const checkAuth = () => {
        try {
          // Check if we're currently on the login page via URL (this shouldn't happen but just in case)
          if (window.location.pathname === '/admin/login') {
            console.log("AdminGuard: Already on login page, not redirecting");
            setIsLoading(false);
            return;
          }

          // Check if we recently logged in successfully (set by login page)
          const loginSuccess = sessionStorage.getItem('admin_login_success');
          if (loginSuccess === 'true') {
            console.log("AdminGuard: Recent login detected, accepting as authenticated");
            setIsAuthenticated(true);
            setIsLoading(false);
            // Clear the flag so it's only used once
            sessionStorage.removeItem('admin_login_success');
            return;
          }
          
          const adminKey = localStorage.getItem('portfolio_admin_key');
          const validAdminKey = process.env.NEXT_PUBLIC_ADMIN_KEY || 'ahmadullah_nekzad_admin';
          
          if (adminKey === validAdminKey) {
            console.log("AdminGuard: User is authenticated");
            setIsAuthenticated(true);
            setIsLoading(false);
          } else {
            console.log("AdminGuard: User is NOT authenticated");
            
            // At this point, we know:
            // 1. User is not authenticated
            // 2. We're not already on login page
            // 3. We don't have a recent successful login
            
            // Let the middleware handle redirection
            // The middleware will redirect to login with returnUrl
            setIsLoading(false);
          }
        } catch (error) {
          console.error("AdminGuard auth check error:", error);
          setIsLoading(false);
        }
      };
      
      checkAuth();
    }, 300);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null;
  }
  
  return <>{children}</>;
}
