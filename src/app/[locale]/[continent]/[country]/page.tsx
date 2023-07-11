import { Suspense } from "react";
import { Metadata } from "next";

import { Cheatsheet } from "@/components/country/Cheatsheet/Cheatsheet";
import { CountryHero } from "@/components/country/CountryHero";
import CountryPosts, {
  CountryPostsLoading,
} from "@/components/country/CountryPosts";
import { getCountry } from "@/graphql/queries/get-country.query";
import { AppLocale } from "@/types/global";
import { createAlternates } from "@/utils/urls";

interface CountryPageProps {
  params: {
    country: string;
    locale: AppLocale;
  };
}

/**
 *
 * @TODO This is not yet supported by next-intl, but once it is it should be addded, in order to
 * build static pages at build time and therefore improve performance
 *
 */
// export async function generateStaticParams() {
//   return ["en", "it"].map((locale) => ({
//     locale,
//   }));
// }

export async function generateMetadata({
  params: { country: countrySlug, locale },
}: CountryPageProps): Promise<Metadata> {
  const { country } = await getCountry({
    slug: countrySlug,
    locale,
    isPreview: false,
  });

  const title = country.name;
  const description = country.metaDescription;
  const images = country.mainImage
    ? [
        {
          url: new URL(country.mainImage.url || ""),
          height: country.mainImage.details.height || 569,
          width: country.mainImage.details.width || 853,
        },
      ]
    : [];

  return {
    title,
    description,
    alternates: createAlternates({ path: `/${countrySlug}` }),
    openGraph: {
      title,
      description,
      images,
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country } = await getCountry({
    slug: params.country,
    locale: params.locale,
    isPreview: false,
  });

  return (
    <div className="flex flex-col">
      {country.name ? (
        <CountryHero name={country.name} image={country.mainImage} />
      ) : (
        <span>Need to provide at least a name for the country</span>
      )}

      {country.name && country.cheatsheet ? (
        <div className="px-4 lg:px-24 xl:px-48 pt-12 lg:pt-32 pb-12 lg:pb-24">
          <Cheatsheet name={country.name} cheatsheet={country.cheatsheet} />
        </div>
      ) : null}

      {country.name && country.slug && country.continent && (
        <Suspense fallback={<CountryPostsLoading />}>
          <CountryPosts
            country={{
              name: country.name,
              slug: country.slug,
              continent: country.continent,
            }}
            locale={params.locale}
          />
        </Suspense>
      )}
    </div>
  );
}
