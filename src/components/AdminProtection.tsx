"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAdmin } from '@/lib/utils';

export function withAdminProtection(Component: React.ComponentType) {
  return function ProtectedComponent(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
      // Prevent execution during SSR
      if (typeof window === 'undefined') return;
      
      // Only proceed if not already redirecting to prevent loops
      if (redirecting) return;
      
      const checkAdminStatus = () => {
        try {
          // Direct localStorage check instead of using the isAdmin function
          const adminKey = localStorage.getItem('portfolio_admin_key');
          const validAdminKey = process.env.NEXT_PUBLIC_ADMIN_KEY || 'ahmadullah_nekzad_admin';
          const isAuthorized = adminKey === validAdminKey;
          
          if (!isAuthorized && !redirecting) {
            // Set redirecting flag to prevent multiple redirects
            setRedirecting(true);
            // Use window.location for a hard redirect rather than Next.js router
            window.location.href = '/admin/login?returnUrl=' + encodeURIComponent(window.location.pathname);
            return;
          } 
          
          if (isAuthorized) {
            setAuthorized(true);
          }
          
          setLoading(false);
        } catch (error) {
          console.error("Auth check error:", error);
          setLoading(false);
        }
      };
      
      // Initial check
      checkAdminStatus();

    }, [redirecting]);

    // Show loading state while checking authentication
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      );
    }

    // If authorized, render the protected component
    return authorized ? <Component {...props} /> : null;
  };
}
