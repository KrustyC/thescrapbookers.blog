import { NextResponse } from "next/server";

import { parseContentfulCountryFields } from "../utils";

import type { CountrySkeleton } from "@/types/contentful";
import { getContentfulClient } from "@/utils/contentful-client";

interface Options {
  params: {
    slug: string;
    locale: string;
  };
}

export async function GET(_: Request, { params }: Options) {
  try {
    const client = getContentfulClient();

    const result = await client.getEntries<CountrySkeleton>({
      content_type: "country",
      locale: params.locale,
      "fields.slug": params.slug,
    });

    const country = result.items[0] || null;
    if (!country) {
      return NextResponse.json({ country: null });
    }

    return NextResponse.json({
      country: parseContentfulCountryFields(country, {
        includeDescription: true,
      }),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch country" });
  }
}
