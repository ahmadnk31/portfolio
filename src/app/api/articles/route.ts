import { prisma } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/aws";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") as string === "true";
    const file = formData.get("image") as File | null;

    // Validate form input
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug and content are required" },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    });

    if (existingArticle) {
      return NextResponse.json(
        { error: "An article with this slug already exists" },
        { status: 400 }
      );
    }

    // Upload image to S3 if provided
    let imageUrl = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `articles/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      imageUrl = await uploadToS3(
        buffer,
        fileName,
        file.type || "image/jpeg"
      );
    }

    // Save article to database
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        description,
        content,
        published,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
