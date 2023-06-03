import { AppLocale, Continent } from "@/types/global";

// Continents
interface GetContinentResponse {
  continent: Continent;
}

export async function getContinent(
  slug: string,
  locale: AppLocale
): Promise<GetContinentResponse> {
  const url = `${process.env.baseUrl}/${locale}/api/continent/${slug}`;
  const res = await fetch(url);
  // const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch continent: ${slug}`);
  }

  return res.json();
}
