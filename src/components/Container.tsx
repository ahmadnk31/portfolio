import React from "react";

export const Container = ({ 
  children,
  className = ""
}: { 
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main className={`max-w-5xl w-full mx-auto py-12 md:py-20 px-6 md:px-10 ${className}`}>
      {children}
    </main>
  );
};
