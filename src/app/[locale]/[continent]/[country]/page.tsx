import { Suspense } from "react";
import { Metadata } from "next";

import { getCountry } from "@/api";
import { Cheatsheet } from "@/components/country/Cheatsheet/Cheatsheet";
import { CountryHero } from "@/components/country/CountryHero";
import CountryPosts, {
  CountryPostsLoading,
} from "@/components/country/Posts/CountryPosts";
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
  const { country } = await getCountry(countrySlug, locale);

  const title = country.name;
  const description = country.metaDescription;
  const images = [
    {
      url: new URL(country.mainImage.url),
      height: country.mainImage.details.height || 569,
      width: country.mainImage.details.width || 853,
    },
  ];

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
  const { country } = await getCountry(params.country, params.locale);

  return (
    <div className="flex flex-col">
      <CountryHero name={country.name} image={country.mainImage} />

      {country.cheatsheet ? (
        <div className="px-4 lg:px-24 xl:px-48 pt-12 lg:pt-32 pb-12 lg:pb-24">
          <Cheatsheet name={country.name} cheatsheet={country.cheatsheet} />
        </div>
      ) : null}

      <Suspense fallback={<CountryPostsLoading />}>
        <CountryPosts
          country={{ name: country.name, slug: country.slug }}
          locale={params.locale}
        />
      </Suspense>
    </div>
  );
}
