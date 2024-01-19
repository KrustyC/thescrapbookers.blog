import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";

export const URLS = {
  asiaArticles: () => "/asia",
  remoteRoaming: () => "/remote-roaming",
  aboutUs: () => "/about-us",
  instagramURL: () =>
    "https://www.instagram.com/the_scrapbookers?igshid=OTjhZDVkZWE=",
  twitterURL: () =>
    "https://twitter.com/TScrapbookers?t=oRRXwZatlSixeDLlCJXc3w&s=09",
  mediumURL: () => "https://medium.com/@the_scrapbookers",
  pinterestURL: () => "https://www.pinterest.com/The_Scrapbookers",
};

interface CreateAlternatesOptions {
  path: string;
}

export function createAlternates({
  path,
}: CreateAlternatesOptions): AlternateURLs | null {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    return null;
  }

  return {
    canonical: `${baseUrl}${path}`,
    languages: {
      // en: `${baseUrl}${path}`,
      it: `${baseUrl}/it${path}`,
    },
  };
}
