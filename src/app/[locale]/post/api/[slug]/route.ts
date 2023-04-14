import { NextResponse } from "next/server";
import { Post } from "types/global";
import { extractImageDataFromContentfulAsset } from "utils/images";
import { ContentfulPostFields } from "types/contentful";
import { getContentfulClient } from "utils/contentful-client";

function parseContentfulPostFields(fields: ContentfulPostFields): Post {
  return {
    title: fields.title,
    slug: fields.slug,
    smallIntro: fields.smallIntro,
    date: fields.date,
    keywords: fields.keywords,
    category: fields.category,
    richtext: fields.richtext,
    thumbnailImage: fields.thumbnailImage
      ? extractImageDataFromContentfulAsset(fields.thumbnailImage)
      : undefined,
    mainImage: extractImageDataFromContentfulAsset(fields.mainImage),
    author: {
      name: fields.author.fields.name,
    },
  };
}

interface NextPost
  extends Pick<Post, "title" | "slug" | "mainImage" | "date" | "smallIntro"> {}

function parseContentfulNextPostFields(
  fields: Omit<ContentfulPostFields, "nextPost">
): NextPost {
  return {
    title: fields.title,
    slug: fields.slug,
    smallIntro: fields.smallIntro,
    date: fields.date,
    mainImage: extractImageDataFromContentfulAsset(fields.mainImage),
  };
}

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = getContentfulClient();

    const result = await client.getEntries<ContentfulPostFields>({
      content_type: "post",
      "fields.slug[all]": params.slug,
    });

    const post = result.items?.[0] || null;

    if (!post) {
      return NextResponse.json({ post: null });
    }

    return NextResponse.json({
      post: parseContentfulPostFields(post.fields),
      nextPost: post.fields.nextPost
        ? parseContentfulNextPostFields(post.fields.nextPost.fields)
        : undefined,
    });
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ error: "Failed to fetch posts" });
  }
}
