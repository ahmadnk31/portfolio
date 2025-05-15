import { getArticleBySlug } from "@/lib/articles";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { notFound } from "next/navigation";
import Image from "next/image";

import { Metadata } from "next";
import { formatDate } from "../../../../lib/formatDate";

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }
  
  return {
    title: `${article.title} | Ahmadullah Nekzad`,
    description: article.description || `Read ${article.title} by Ahmadullah Nekzad`,
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }
  
  return (
    <Container>
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <span className="text-sm text-gray-500">
            {formatDate(article.createdAt.toString())}
          </span>
          <Heading className="font-black text-3xl mt-2 mb-4">
            {article.title}
          </Heading>
          
          {article.description && (
            <Paragraph className="text-lg text-gray-600 mb-6">
              {article.description}
            </Paragraph>
          )}
          
          {article.imageUrl && (
            <div className="relative h-[300px] md:h-[400px] w-full mb-8 rounded-lg overflow-hidden">
              <Image 
                src={article.imageUrl} 
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
        
        <div className="prose prose-blue max-w-none">
          {/* Split the content by newlines and wrap each paragraph */}
          {article.content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Heading as="h3" className="text-xl mb-4">
            Share this article
          </Heading>
          
          <div className="flex gap-4">
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://ahmadullah.com/articles/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-100 hover:bg-blue-50 px-4 py-2 rounded-md transition-all duration-200"
            >
              Twitter
            </a>
            <a 
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://ahmadullah.com/articles/${article.slug}`)}&title=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-100 hover:bg-blue-50 px-4 py-2 rounded-md transition-all duration-200"
            >
              LinkedIn
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://ahmadullah.com/articles/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-100 hover:bg-blue-50 px-4 py-2 rounded-md transition-all duration-200"
            >
              Facebook
            </a>
          </div>
        </div>
      </article>
    </Container>
  );
}
