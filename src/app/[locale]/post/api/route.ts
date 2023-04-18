import { NextResponse } from "next/server";
import type { Post } from "types/global";
import type { ContentfulPostFields } from "types/contentful";
import { extractImageDataFromContentfulAsset } from "utils/images";
import { getContentfulClient } from "utils/contentful-client";

function parseContentfulPostFields(
  fields: ContentfulPostFields
): Pick<
  Post,
  "title" | "slug" | "date" | "smallIntro" | "thumbnailImage" | "category"
> {
  return {
    title: fields.title,
    slug: fields.slug,
    smallIntro: fields.smallIntro,
    date: fields.date,
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

    const result = await client.getEntries<ContentfulPostFields>({
      content_type: "post",
      locale: params.locale,
      "metadata.tags.sys.id[all]": tag || undefined,
      select:
        "fields.title,fields.slug,fields.smallIntro,fields.thumbnailImage,fields.date,fields.category",
    });

    const posts = result.items.map((item) =>
      parseContentfulPostFields(item.fields)
    );

    return NextResponse.json({ posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" });
  }
}
