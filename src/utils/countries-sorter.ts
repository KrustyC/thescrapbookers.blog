import { Country } from "@/types/generated/graphql";

/**
 * This is a small hack to quickly sort countries according to the order I prefer.
 * in the future it may be done directly on the API, or Contentful.
 */
const COUNTRY_ORDERED_SLUGS = ["thailand", "laos", "vietnam", "cambodia"];

interface ItemWithSlug {
  slug?: string | null;
}

export function sortCountries<T extends ItemWithSlug>(countries: T[]): T[] {
  // Filter out countries that don't have a slug
  const filteredCountries = countries.filter((country) => !!country.slug);
  filteredCountries.sort((a, b) => {
    if (!a.slug || !b.slug) return 0;

    return (
      COUNTRY_ORDERED_SLUGS.indexOf(a.slug) -
      COUNTRY_ORDERED_SLUGS.indexOf(b.slug)
    );
  });

  return filteredCountries;
}
