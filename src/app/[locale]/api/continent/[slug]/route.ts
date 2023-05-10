import { NextResponse } from "next/server";
import type { ContinentSkeleton } from "types/contentful";
import { getContentfulClient } from "utils/contentful-client";

import { parseContentfulContinentFields } from "../utils";

interface Options {
  params: {
    slug: string;
    locale: string;
  };
}

export async function GET(_: Request, { params }: Options) {
  try {
    const client = getContentfulClient();

    const result = await client.getEntries<ContinentSkeleton>({
      content_type: "continent",
      locale: params.locale,
      "fields.slug": params.slug,
      select: ["fields.name", "fields.slug", "fields.mainImage"],
    });

    const continent = result.items[0] || null;

    if (!continent) {
      return NextResponse.json({ continent: null });
    }

    return NextResponse.json({
      continent: parseContentfulContinentFields(continent),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch continent" });
  }
}
