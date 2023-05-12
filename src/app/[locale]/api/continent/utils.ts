import { Continent } from "types/global";
import { extractImageDataFromContentfulAsset } from "utils/images";
import { ContinentSkeleton } from "types/contentful";
import { Entry } from "contentful";

export function parseContentfulContinentFields(
  continent: Entry<ContinentSkeleton>
): Continent | null {
  const { fields } = continent;

  const mainImage = fields.mainImage
    ? extractImageDataFromContentfulAsset(fields.mainImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;

  if (
    typeof fields.name !== "string" ||
    typeof fields.slug !== "string" ||
    typeof fields.mainDescription !== "string"
  ) {
    return null;
  }

  return {
    name: fields.name,
    slug: fields.slug,
    mainDescription: fields.mainDescription,
    metaDescription: fields.metaDescription as unknown as string,
    mainImage,
  };
}
