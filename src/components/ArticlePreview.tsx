"use client";
import { Blog } from "@/types/blog";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "../../lib/formatDate";
import { useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";

export const ArticlePreview = ({ articles }: { articles: Blog[] }) => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={article.isDbArticle ? `/articles/${article.slug}` : `/blog/${article.slug}`}
          className="group"
          onMouseEnter={() => setHoveredSlug(article.slug)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <motion.div 
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            animate={hoveredSlug === article.slug 
              ? { y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" } 
              : { y: 0 }
            }
            transition={{ duration: 0.2 }}
          >
            <div className="relative h-48 w-full">
              <img 
                src={article.image} 
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">
                {formatDate(article.date)}
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-gray-700 mb-4 line-clamp-2">
                {article.description}
              </p>
              
              <div className="flex items-center text-blue-600 font-medium">
                Read Article
                <motion.div
                  animate={hoveredSlug === article.slug ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconArrowRight size={18} className="ml-1" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};
