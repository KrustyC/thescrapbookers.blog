import { Country } from "@/types/global";

export function generatePostHref(
  postSlug: string | undefined,
  country: Pick<Country, "slug" | "continent"> | undefined
) {
  if (!postSlug) {
    return "/";
  }

  if (!country) {
    return `/generic/${postSlug}`;
  }

  return `/${country.continent?.slug}/${country.slug}/${postSlug}`;
}
