"use client";
import { navlinks } from "@/constants/navlinks";
import { Navlink } from "@/types/navlink";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./Heading";
import { socials } from "@/constants/socials";
import { Badge } from "./Badge";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutSidebarRightCollapse, IconMenu2, IconX } from "@tabler/icons-react";
import { isMobile } from "@/lib/utils";

export const Sidebar = () => {
  const [open, setOpen] = useState(isMobile() ? false : true);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Handle window resize
  useEffect(() => {
    // Function to handle responsive behavior with debounce
    let resizeTimer: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Check if we're on desktop (not mobile)
        const isDesktop = window.innerWidth >= 1024; // lg breakpoint in Tailwind is 1024px
        
        // If desktop, always show sidebar
        if (isDesktop && !open) {
          setOpen(true);
        }
      }, 150); // Small debounce to prevent excessive re-renders
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call once on mount to ensure correct initial state
    handleResize();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && mounted && isMobile() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {open && mounted && (
          <motion.div
            initial={{ x: -300, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            exit={{ x: -300, opacity: 0 }}
            className="px-6 z-50 py-8 bg-white dark:bg-gray-900 max-w-[280px] w-full fixed lg:relative h-screen left-0 flex flex-col justify-between shadow-xl lg:shadow-none border-r border-gray-200/70 dark:border-gray-800/70"
          >
            <div className="flex-1 overflow-auto scrollbar-hide">
              <div className="flex justify-between items-center lg:hidden">
                <SidebarHeader />
                <button 
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <IconX size={20} />
                </button>
              </div>
              <div className="lg:block hidden">
                <SidebarHeader />
              </div>
              <Navigation setOpen={setOpen} />
            </div>
            <div onClick={() => isMobile() && setOpen(false)} className="mt-6">
              <Badge href="/resume" text="View My Resume" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile toggle button */}
      <button
        className="fixed lg:hidden bottom-6 right-6 h-12 w-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full flex items-center justify-center z-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? <IconX size={20} /> : <IconMenu2 size={20} />}
      </button>
    </>
  );
};

export const Navigation = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col space-y-1 my-8 relative z-[100]">
      <div className="mb-6">
        <h2 className="text-xs uppercase text-gray-500 font-medium mb-2 px-3">Main Navigation</h2>
        <div className="space-y-1">
          {navlinks.map((link: Navlink) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => isMobile() && setOpen(false)}
              className={twMerge(
                "text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 transition-all duration-200 flex items-center space-x-3 py-2.5 px-3 rounded-md text-sm",
                isActive(link.href) && "bg-blue-50 text-blue-700 font-medium"
              )}
            >
              <link.icon
                className={twMerge(
                  "h-4 w-4 flex-shrink-0",
                  isActive(link.href) && "text-blue-600"
                )}
              />
              <span>{link.label}</span>
              {isActive(link.href) && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 w-1 h-5 bg-blue-600 rounded-r-full"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30
                  }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xs uppercase text-gray-500 font-medium mb-2 px-3">Connect</h2>
        <div className="flex flex-wrap gap-2 px-3 py-2">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 p-2 rounded-md transition-colors"
              title={social.label}
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const SidebarHeader = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-sm opacity-75"></div>
        <Image
          src="/images/ahmadullah.png"
          alt="Ahmadullah Nekzad"
          height="48"
          width="48"
          className="object-cover object-center rounded-full border-2 border-white relative z-10"
        />
      </div>
      <div className="flex text-sm flex-col">
        <p className="font-bold text-gray-900">Ahmadullah Nekzad</p>
        <p className="text-blue-600 text-xs font-medium">AWS Cloud Architect</p>
      </div>
    </div>
  );
};
