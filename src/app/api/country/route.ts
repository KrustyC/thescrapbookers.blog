import { NextResponse } from "next/server";

import { getContentfulClient } from "@/utils/contentful-client";

function getHref(slug: string, continent: any) {
  if (!slug) {
    return undefined;
  }

  const continentSlug = continent.fields.slug;

  return `/${continentSlug}/${slug}`;
}

export async function GET() {
  try {
    const client = getContentfulClient();

    const result = await client.getEntries({
      content_type: "country",
      locale: "en",
      include: 2,
      select: ["fields.slug", "fields.continent", "sys.updatedAt"],
    });

    const countries = result?.items.map((country) => ({
      lastModified: country.sys.updatedAt,
      href: getHref(
        country.fields.slug as unknown as string,
        country.fields.continent
      ),
    }));

    return NextResponse.json({
      success: true,
      countries,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      succes: false,
      error: "Failed to fetch countries",
    });
  }
}
