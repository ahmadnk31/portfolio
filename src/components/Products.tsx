"use client";
import React from "react";
import { Heading } from "./Heading";
import { Product } from "@/types/products";
import { products } from "@/constants/products";
import Link from "next/link";
import Image from "next/image";
import { Paragraph } from "./Paragraph";
import { motion } from "framer-motion";

export const Products = () => {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 gap-8">
        {products.map((product: Product, idx: number) => (
          <motion.div
            key={product.href}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="card-hover bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
          >
            <Link
              href={product.slug ? `/projects/${product.slug}` : product.href}
              className="group flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-between p-6 md:w-2/3">
                <div>
                  <Heading
                    as="h3"
                    className="font-bold text-xl md:text-2xl"
                  >
                    {product.title}
                  </Heading>
                  <Paragraph className="mt-3 text-gray-600">
                    {product.description}
                  </Paragraph>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.stack?.map((stack: string) => (
                    <span
                      key={stack}
                      className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
