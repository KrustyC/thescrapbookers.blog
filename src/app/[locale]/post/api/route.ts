import { NextResponse } from "next/server";
import type { Post } from "types/global";
import type { PostSkeleton } from "types/contentful";
import { extractImageDataFromContentfulAsset } from "utils/images";
import { getContentfulClient } from "utils/contentful-client";
import { Entry } from "contentful";

function parseContentfulPostFields(
  post: Entry<PostSkeleton>
): Pick<
  Post,
  "title" | "slug" | "date" | "smallIntro" | "thumbnailImage" | "category"
> | null {
  const { fields } = post;

  if (
    typeof fields.title !== "string" ||
    typeof fields.slug !== "string" ||
    typeof fields.smallIntro !== "string" ||
    typeof fields.category !== "string" ||
    typeof fields.date !== "string"
  ) {
    return null;
  }

  return {
    title: fields.title,
    slug: fields.slug,
    smallIntro: fields.smallIntro,
    date: new Date(fields.date),
    category: fields.category,
    thumbnailImage: fields.thumbnailImage
      ? extractImageDataFromContentfulAsset(fields.thumbnailImage)
      : undefined,
  };
}

interface Options {
  params: {
    slug: string;
    locale: string;
  };
}

export async function GET(request: Request, { params }: Options) {
  try {
    const client = getContentfulClient();

    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");

    const result = await client.getEntries<PostSkeleton>({
      content_type: "post",
      locale: params.locale,
      "metadata.tags.sys.id[all]": tag ? [tag] : undefined,
      select: [
        "fields.title",
        "fields.slug",
        "fields.smallIntro",
        "fields.thumbnailImage",
        "fields.date",
        "fields.category",
      ],
    });

    const posts = result.items.map((item) => parseContentfulPostFields(item));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" });
  }
}
