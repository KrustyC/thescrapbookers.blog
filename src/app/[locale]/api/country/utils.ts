import { Entry } from "contentful";

import { ContinentSkeleton, CountrySkeleton } from "@/types/contentful";
import { Country } from "@/types/global";
import { extractImageDataFromContentfulAsset } from "@/utils/images";

interface ParseContentfulCountryFieldsOptions {
  includeDescription: boolean;
}

export function parseContentfulCountryFields(
  country: Entry<CountrySkeleton>,
  { includeDescription = false }: ParseContentfulCountryFieldsOptions
): Country | null {
  const { fields } = country;

  const mainImage = fields.mainImage
    ? extractImageDataFromContentfulAsset(fields.mainImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;

  console.log(fields)

  if (!fields.continent || !mainImage) {
    return null;
  }

  return {
    name: fields.name as unknown as string,
    slug: fields.slug as unknown as string,
    metaDescription: fields.metaDescription as unknown as string,
    description: includeDescription
      ? (fields.description as string)
      : undefined,
    mainImage,
    continent: {
      name: (fields.continent as unknown as ContinentSkeleton).fields
        .name as unknown as string, // Really dont like this, but COntentful types are fucked up!
      slug: (fields.continent as unknown as ContinentSkeleton).fields
        .slug as unknown as string,
    },
  };
}
