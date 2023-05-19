import { NextResponse } from "next/server";

import { parseContentfulCountryFields } from "./utils";

import { CountrySkeleton } from "@/types/contentful";
import { getContentfulClient } from "@/utils/contentful-client";

interface Options {
  params: {
    locale: string;
  };
}

export async function GET(_: Request, { params }: Options) {
  try {
    const client = getContentfulClient();

    const result = await client.getEntries<CountrySkeleton>({
      content_type: "country",
      locale: params.locale,
    });

    const countries = result.items || [];

    return NextResponse.json({
      countries: countries.map((country) =>
        parseContentfulCountryFields(country, { includeDescription: false })
      ),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch continents" });
  }
}
