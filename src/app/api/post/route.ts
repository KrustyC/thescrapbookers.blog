import { NextResponse } from "next/server";

import { getContentfulClient } from "@/utils/contentful-client";

function getHref(slug: string, country: any) {
  if (!country) {
    return `/generic/${slug}`;
  }

  const countrySlug = country.fields.slug;
  const continentSlug = country.fields.continent.fields.slug;

  return `/${continentSlug}/${countrySlug}/${slug}`;
}

export async function GET() {
  try {
    const client = getContentfulClient();

    const result = await client.getEntries({
      content_type: "post",
      locale: "en",
      include: 3,
      select: ["fields.slug", "fields.country", "sys.updatedAt"],
    });

    const posts = result?.items.map((post) => ({
      lastModified: post.sys.updatedAt,
      href: getHref(post.fields.slug as unknown as string, post.fields.country),
    }));

    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch posts",
    });
  }
}
