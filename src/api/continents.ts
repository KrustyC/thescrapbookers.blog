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
  const res = await fetch(
    url,
    process.env.disableCache ? { next: { revalidate: 0 } } : undefined
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch continent: ${slug}`);
  }

  return res.json();
}
