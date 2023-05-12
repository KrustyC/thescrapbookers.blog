import { NextResponse } from "next/server";
import type { PostSkeleton } from "types/contentful";
import { getContentfulClient } from "utils/contentful-client";

import { parseContentfulPostFieldsForList } from "./utils";

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
    const country = searchParams.get("country");

    const result = await client.getEntries<PostSkeleton>({
      content_type: "post",
      locale: params.locale,
      include: 2, // This is used to fetch two nested entries (country and continent)
      "metadata.tags.sys.id[all]": tag ? [tag] : undefined,
      "fields.country.sys.contentType.sys.id": country ? "country" : undefined,
      "fields.country.fields.slug[all]": country ? [country] : undefined,
      select: [
        "fields.title",
        "fields.slug",
        "fields.smallIntro",
        "fields.thumbnailImage",
        "fields.date",
        "fields.category",
        "fields.country",
      ],
    });

    const posts = result.items.map(parseContentfulPostFieldsForList);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" });
  }
}
