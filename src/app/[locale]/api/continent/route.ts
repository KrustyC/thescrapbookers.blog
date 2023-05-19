import { NextResponse } from "next/server";

import { parseContentfulContinentFields } from "./utils";

import { ContinentSkeleton } from "@/types/contentful";
import { getContentfulClient } from "@/utils/contentful-client";

interface Options {
  params: {
    locale: string;
  };
}

export async function GET(_: Request, { params }: Options) {
  try {
    const client = getContentfulClient();

    const result = await client.getEntries<ContinentSkeleton>({
      content_type: "continent",
      locale: params.locale,
    });

    const continents = result.items || [];

    return NextResponse.json({
      continents: continents.map(parseContentfulContinentFields),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch continents" });
  }
}
