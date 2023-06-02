import { NextResponse } from "next/server";

import type { CountrySkeleton } from "@/types/contentful";
import { getContentfulClient } from "@/utils/contentful-client";

import { parseContentfulCountryFields } from "../../../country/utils";

interface Options {
  params: {
    slug: string;
    locale: string;
  };
}

export async function GET(_: Request, { params }: Options) {
  const continentSlug = params.slug;
  try {
    const client = getContentfulClient();

    const result = await client.getEntries<CountrySkeleton>({
      content_type: "country",
      locale: params.locale,
      "fields.continent.sys.contentType.sys.id": "continent",
      "fields.continent.fields.slug": continentSlug,
    });

    const countries = result.items || [];

    return NextResponse.json({
      countries: countries.map((country) =>
        parseContentfulCountryFields(country, { includeDescription: false })
      ),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: `Failed to fetch countries for continent: ${continentSlug}`,
    });
  }
}
