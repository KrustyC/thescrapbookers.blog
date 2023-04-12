import { NextResponse } from "next/server";
import { createClient } from "contentful";
import type { Post } from "types/global";
import type { ContentfulPostFields } from "types/contentful";
import { extractImageDataFromContentfulAsset } from "utils/images";

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

export async function GET(request: Request) {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID as string,
      accessToken: (process.env.IS_PREVIEW === "true"
        ? process.env.CONTENTFUL_PREVIEW_TOKEN
        : process.env.CONTENTFUL_DELIVERY_TOKEN) as string,
    });

    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");

    if (!tag) {
      throw new Error("tag is a mandatory field");
    }

    const result = await client.getEntries<ContentfulPostFields>({
      content_type: "post",
      "metadata.tags.sys.id[all]": tag,
      select:
        "fields.title,fields.slug,fields.smallIntro,fields.thumbnailImage,fields.date,fields.category",
    });

    const posts = result.items
      .slice(0, 3)
      .map((item) => parseContentfulPostFields(item.fields));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ error: "Failed to fetch posts" });
  }
}
