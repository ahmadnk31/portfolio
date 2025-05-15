import { prisma } from "@/lib/prisma";

export async function getArticles(where = {}) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        ...where,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        slug,
      },
    });
    
    return article;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
}

export async function getPublishedArticles() {
  return getArticles({ published: true });
}
