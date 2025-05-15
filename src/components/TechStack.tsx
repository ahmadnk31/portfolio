import Image from "next/image";
import React from "react";
import { Heading } from "./Heading";
import { twMerge } from "tailwind-merge";

export const TechStack = () => {
  const stack = [
    {
      title: "Next.js",
      src: "/images/logos/next.png",

      className: "h-10 w-14",
    },
    {
      title: "AWS",
      src: "/images/logos/aws.webp",

      className: "h-10 w-10",
    },
    {
      title: "Figma",
      src: "/images/logos/figma.png",

      className: "h-10 w-8",
    },
    {
      title: "Framer Motion",
      src: "/images/logos/framer.webp",

      className: "h-10 w-10",
    },
    {
      title: "Node",
      src: "/images/logos/node.png",

      className: "h-10 w-12",
    },
    {
      title: "Tailwind",
      src: "/images/logos/tailwind.png",

      className: "h-10 w-24",
    },
    {
      title: "Vercel",
      src: "/images/logos/vercel.png",

      className: "h-10 w-24",
    },
  ];
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-100 shadow-sm mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
        <Heading
          as="h2"
          className="font-bold text-xl"
        >
          Technologies I Work With
        </Heading>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {stack.map((item) => (
          <div 
            key={item.src}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <Image
              src={item.src}
              width={`100`}
              height={`100`}
              alt={item.title}
              className={twMerge("object-contain h-12 mb-3", item.className)}
            />
            <span className="text-sm font-medium text-gray-700">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
