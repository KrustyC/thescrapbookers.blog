import { Entry } from "contentful";

import { ContinentSkeleton } from "types/contentful";
import { Continent } from "types/global";
import { extractImageDataFromContentfulAsset } from "utils/images";

export function parseContentfulContinentFields(
  continent: Entry<ContinentSkeleton>
): Continent | null {
  const { fields } = continent;

  const mainImage = fields.mainImage
    ? extractImageDataFromContentfulAsset(fields.mainImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;

  if (!mainImage) {
    return null;
  }

  // This looks ugly as hell, but unfortunately Contentful SDK new types aer horrible
  return {
    name: fields.name as unknown as string,
    slug: fields.slug as unknown as string,
    mainDescription: fields.mainDescription as unknown as string,
    metaDescription: fields.metaDescription as unknown as string,
    mainImage,
  };
}
