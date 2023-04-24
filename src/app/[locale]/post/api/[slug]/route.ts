import { NextResponse } from "next/server";
import { Post } from "types/global";
import { extractImageDataFromContentfulAsset } from "utils/images";
import { AuthorSkelton, PostSkeleton } from "types/contentful";
import { getContentfulClient } from "utils/contentful-client";
import { Entry } from "contentful";

function parseContentfulPostFields(post: Entry<PostSkeleton>): Post | null {
  const { fields } = post;

  const mainImage = fields.mainImage
    ? extractImageDataFromContentfulAsset(fields.mainImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;

  if (
    typeof fields.title !== "string" ||
    typeof fields.slug !== "string" ||
    typeof fields.smallIntro !== "string" ||
    typeof fields.category !== "string" ||
    typeof fields.date !== "string" ||
    !mainImage
  ) {
    return null;
  }

  return {
    title: fields.title,
    slug: fields.slug,
    smallIntro: fields.smallIntro,
    date: new Date(fields.date),
    category: fields.category,
    richtext: fields.richtext,
    thumbnailImage: fields.thumbnailImage
      ? extractImageDataFromContentfulAsset(fields.thumbnailImage)
      : undefined,
    mainImage,
    author: {
      name: (fields.author as AuthorSkelton).fields.name,
    },
  };
}

interface NextPost
  extends Pick<Post, "title" | "slug" | "mainImage" | "date" | "smallIntro"> {}

function parseContentfulNextPostFields(
  fields: Omit<PostSkeleton["fields"], "nextPost">
): NextPost | null {
  const mainImage = extractImageDataFromContentfulAsset(fields.mainImage);

  if (
    typeof fields.title !== "string" ||
    typeof fields.slug !== "string" ||
    typeof fields.smallIntro !== "string" ||
    typeof fields.category !== "string" ||
    typeof fields.date !== "string" ||
    !mainImage
  ) {
    return null;
  }

  return {
    title: fields.title,
    slug: fields.slug,
    smallIntro: fields.smallIntro,
    date: fields.date,
    mainImage,
  };
}

interface Options {
  params: {
    slug: string;
    locale: string;
  };
}

export async function GET(_: Request, { params }: Options) {
  try {
    const client = getContentfulClient();

    const result = await client.getEntries<PostSkeleton>({
      content_type: "post",
      locale: params.locale,
      "fields.slug[all]": [params.slug],
    });
    const post = result.items?.[0] || null;

    if (!post) {
      return NextResponse.json({ post: null });
    }

    return NextResponse.json({
      post: parseContentfulPostFields(post),
      nextPost: post.fields.nextPost
        ? parseContentfulNextPostFields(
            (post.fields.nextPost as PostSkeleton).fields
          )
        : undefined,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch post" });
  }
}
