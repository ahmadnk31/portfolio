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
      <span className="text-4xl">📝</span>
      <Heading className="font-black pb-2">Insights & Articles</Heading>
      <Paragraph className="pb-6 max-w-2xl">
        I share my knowledge about <Highlight>cloud architecture</Highlight>, web development, 
        and building scalable applications. Here you'll find practical insights from my experience
        as an <Highlight>AWS certified architect</Highlight>.
      </Paragraph>
      
      {allBlogs.length > 0 ? (
        <Blogs blogs={allBlogs} />
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">No articles found. Check back soon!</p>
        </div>
      )}
    </Container>
  );
}
