import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { getAllBlogs } from "../../../lib/getAllBlogs";
import { Blogs } from "@/components/Blogs";
import { Metadata } from "next";
import { getPublishedArticles } from "@/lib/articles";
import { Blog } from "@/types/blog";

export const metadata: Metadata = {
  title: "Articles & Blog | Ahmadullah Nekzad",
  description:
    "Articles and blog posts by Ahmadullah Nekzad about cloud solutions, web development, and other technology topics.",
  keywords: [
    'AWS Cloud Architecture', 
    'Web Development Articles', 
    'Full-Stack Development Blog', 
    'Cloud Computing Tips',
    'Tech Blog',
    'Programming Insights'
  ],
  openGraph: {
    title: "Articles & Blog | Ahmadullah Nekzad",
    description: "Articles and blog posts by Ahmadullah Nekzad about cloud solutions, web development, and other technology topics.",
    url: 'https://ahmadullah.cdev/blog',
    type: 'website',
    images: [
      {
        url: '/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ahmadullah Nekzad Blog'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Articles & Blog | Ahmadullah Nekzad",
    description: "Articles and blog posts about cloud solutions, web development, and other technology topics.",
    images: ['/images/blog-og.jpg'],
  },
};

export default async function BlogPage() {
  // Get MDX blogs
  const mdxBlogs = await getAllBlogs();
  const mdxData = mdxBlogs.map(({ component, ...meta }) => meta);
  
  // Get database articles
  const dbArticles = await getPublishedArticles();
  const articlesData: Blog[] = dbArticles.map(article => ({
    title: article.title,
    description: article.description || "",
    date: article.createdAt.toISOString(),
    slug: article.slug,
    image: article.imageUrl || "/images/default-article.jpg",
    tags: [],
    isDbArticle: true
  }));
  
  // Combine both sources
  const allBlogs = [...mdxData, ...articlesData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <Container>
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute -top-20 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
        
        <div className="mb-12">
          <span className="inline-block p-3 bg-blue-50 text-blue-600 rounded-xl mb-4">📝</span>
          <Heading className="font-black text-3xl md:text-4xl mb-4">Insights & Knowledge</Heading>
          <Paragraph className="pb-6 max-w-2xl text-lg">
            I share my expertise about <Highlight>cloud architecture</Highlight>, web development, 
            and building scalable applications. Here you&apos;ll find practical insights from my experience
            as an <Highlight>AWS certified architect</Highlight>.
          </Paragraph>
        </div>
        
        {allBlogs.length > 0 ? (
          <Blogs blogs={allBlogs} />
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Articles Coming Soon</h3>
            <p className="text-gray-500">I&apos;m currently working on new content. Check back soon!</p>
          </div>
        )}
      </div>
    </Container>
  );
}
