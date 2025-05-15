import React from "react";

import { twMerge } from "tailwind-merge";

export const Highlight = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span className={twMerge("bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-medium px-2 py-0.5 rounded-md", className)}>
      {children}
    </span>
  );
};
