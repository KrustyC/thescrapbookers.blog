import { AppLocale, Country, ShortCountry } from "@/types/global";

interface GetCountryResponse {
  country: Country;
}

export async function getCountry(
  slug: string,
  locale: AppLocale
): Promise<GetCountryResponse> {
  const url = `${process.env.baseUrl}/${locale}/api/country/${slug}`;
  const res = await fetch(
    url,
    process.env.disableCache ? { next: { revalidate: 0 } } : undefined
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch continent: ${slug}`);
  }

  return res.json();
}

interface GetCountriesForContinentResponse {
  countries: ShortCountry[];
}

/**
 * This is a small hack to quickly sort countries according to the order I prefer.
 * in the future it may be done directly on the API, or Contentful.
 */
const countryOrderedSlugs = ["thailand", "laos", "vietnam", "cambodia"];

export async function getCountriesForContinent(
  continentSlug: string,
  locale: AppLocale
): Promise<GetCountriesForContinentResponse> {
  const url = `${process.env.baseUrl}/${locale}/api/continent/${continentSlug}/countries`;
  const res = await fetch(
    url,
    process.env.disableCache ? { next: { revalidate: 0 } } : undefined
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch countries for continent: ${continentSlug}`
    );
  }

  const { countries } = (await res.json()) as { countries: Country[] };

  const filteredCountries = countries.filter((country) => country !== null);
  filteredCountries.sort((a, b) => {
    return (
      countryOrderedSlugs.indexOf(a.slug) - countryOrderedSlugs.indexOf(b.slug)
    );
  });

  return { countries: filteredCountries };
}
