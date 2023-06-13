import { Entry } from "contentful";

import { ContinentSkeleton, CountrySkeleton } from "@/types/contentful";
import { Country, CountryCheatsheet, ShortCountry } from "@/types/global";
import { extractImageDataFromContentfulAsset } from "@/utils/images";

interface ParseContentfulCountryFieldsOptions {
  includeDescription?: boolean;
  includeCheatsheet?: boolean;
}

export function parseContentfulCountryFields(
  country: Entry<CountrySkeleton>,
  {
    includeDescription = false,
    includeCheatsheet = false,
  }: ParseContentfulCountryFieldsOptions
): Country | null {
  const { fields } = country;

  const mainImage = fields.mainImage
    ? extractImageDataFromContentfulAsset(fields.mainImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;

  const thumbnailImage = fields.thumbnailImage
    ? extractImageDataFromContentfulAsset(fields.thumbnailImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;


  if (!fields.continent || !mainImage || !thumbnailImage) {
    return null;
  }

  return {
    name: fields.name as unknown as string,
    slug: fields.slug as unknown as string,
    metaDescription: fields.metaDescription as unknown as string,
    shortDescription: fields.shortDescription as unknown as string,
    description: includeDescription
      ? (fields.description as string)
      : undefined,
    cheatsheet:
      includeCheatsheet && fields.cheatsheet
        ? (fields.cheatsheet as unknown as CountryCheatsheet)
        : undefined,
    mainImage,
    thumbnailImage,
    continent: {
      name: (fields.continent as unknown as ContinentSkeleton).fields
        .name as unknown as string, // Really dont like this, but COntentful types are fucked up!
      slug: (fields.continent as unknown as ContinentSkeleton).fields
        .slug as unknown as string,
    },
  };
}

export function parseSmallContentfulCountryFields(
  country: Entry<CountrySkeleton>
): ShortCountry | null {
  const { fields } = country;

  const thumbnailImage = fields.thumbnailImage
    ? extractImageDataFromContentfulAsset(fields.thumbnailImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;

  if (!fields.continent || !thumbnailImage) {
    return null;
  }

  return {
    name: fields.name as unknown as string,
    slug: fields.slug as unknown as string,
    shortDescription: fields.shortDescription as unknown as string,
    thumbnailImage,
  };
}
