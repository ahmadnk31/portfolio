import React from "react";

import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";

export const Paragraph = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={twMerge(
        "text-sm md:text-base font-normal text-gray-600 leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
};
