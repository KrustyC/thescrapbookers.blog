import { AppLocale, Country } from "@/types/global";

interface GetCountryResponse {
  country: Country;
}

export async function getCountry(
  slug: string,
  locale: AppLocale
): Promise<GetCountryResponse> {
  const url = `${process.env.baseUrl}/${locale}/api/country/${slug}`;
  // const res = await fetch(url);
  const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch continent: ${slug}`);
  }

  return res.json();
}

interface GetCountriesForContinentResponse {
  countries: Country[];
}

export async function getCountriesForContinent(
  continentSlug: string,
  locale: AppLocale
): Promise<GetCountriesForContinentResponse> {
  const url = `${process.env.baseUrl}/${locale}/api/continent/${continentSlug}/countries?`;
  const res = await fetch(url);
  // const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch countries for continent: ${continentSlug}`
    );
  }

  return res.json();
}
