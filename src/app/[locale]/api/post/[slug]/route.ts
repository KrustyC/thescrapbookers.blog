import { NextResponse } from "next/server";
import { PostSkeleton } from "types/contentful";
import { getContentfulClient } from "utils/contentful-client";

import {
  parseContentfulPostFieldsForSinglePost,
  parseContentfulNextPostFields,
} from "../utils";

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
      include: 3, // This is used to fetch two nested entries (country and continent)
      "fields.slug": params.slug,
    });

    const post = result.items?.[0] || null;

    if (!post) {
      return NextResponse.json({ post: null });
    }

    return NextResponse.json({
      post: parseContentfulPostFieldsForSinglePost(post),
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
