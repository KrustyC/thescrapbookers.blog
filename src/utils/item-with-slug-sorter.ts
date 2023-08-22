interface ItemWithSlug {
  slug?: string | null;
}

/**
 * This is a small hack to quickly sort items according to the order I prefer.
 * in the future it may be done directly on the API, or Contentful.
 */
export function sortItemsWithSlug<T extends ItemWithSlug>(
  items: T[],
  orderedSlugs: string[]
): T[] {
  // Filter out items that don't have a slug
  const filteredCountries = items.filter((country) => !!country.slug);

  filteredCountries.sort((a, b) => {
    if (!a.slug || !b.slug) return 0;

    return orderedSlugs.indexOf(a.slug) - orderedSlugs.indexOf(b.slug);
  });

  return filteredCountries;
}
