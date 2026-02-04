import { NextResponse } from "next/server";

import { getContentfulClient } from "@/utils/contentful-client";

export async function GET() {
  try {
    const client = getContentfulClient();

    const result = await client.getEntries({
      content_type: "continent",
      locale: "en",
      select: ["fields.slug", "sys.updatedAt"],
    });

    const continents = result?.items.map((continent) => ({
      lastModified: continent.sys.updatedAt,
      href: `/${continent.fields.slug}`,
      slug: continent.fields.slug,
    }));

    return NextResponse.json({
      success: true,
      continents,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      succes: false,
      error: "Failed to fetch continents",
    });
  }
}
