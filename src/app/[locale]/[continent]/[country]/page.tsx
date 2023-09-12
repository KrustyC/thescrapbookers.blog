import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getTranslator } from "next-intl/server";

import { Cheatsheet } from "@/components/country/Cheatsheet/Cheatsheet";
import { CountryHero } from "@/components/country/CountryHero";
import { PostCard } from "@/components/PostCard/PostCard";
import { getCountryWithPosts } from "@/graphql/queries/get-country-with-posts.query";
import { ExamsIcon } from "@/icons/Exams";
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
  const { isEnabled } = draftMode();
  const { country } = await getCountryWithPosts({
    slug: countrySlug,
    locale,
    isPreview: isEnabled,
  });

  const title = `${country.metaTitle} | The Scrapbookers`;
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

export default async function CountryPage({
  params: { country: countrySlug, locale },
}: CountryPageProps) {
  const { isEnabled } = draftMode();

  const tArticles = await getTranslator(locale, "Country.Articles");

  const { country } = await getCountryWithPosts({
    slug: countrySlug,
    locale,
    isPreview: isEnabled,
  });

  return (
    <div className="flex flex-col">
      {country.name ? (
        <CountryHero name={country.name} image={country.mainImage} />
      ) : (
        <span>Need to provide at least a name for the country</span>
      )}

      {country.description ? (
        <div className="bg-primary px-6 lg:px-48 py-12 lg:py-24">
          <p className="text-white font-regular">{country.description}</p>
        </div>
      ) : (
        <span>Need to provide a description for the country</span>
      )}

      {country.name && country.slug && country.cheatsheet ? (
        <div className="px-4 lg:px-24 xl:px-48 pt-12 lg:pt-32 pb-12 lg:pb-24">
          <Cheatsheet
            country={{
              name: country.name,
              slug: country.slug,
              cheatsheet: country.cheatsheet,
            }}
          />
        </div>
      ) : null}

      {country.posts.length > 0 ? (
        <div className="px-8 lg:px-24 xl:px-48 mt-8 mb-24">
          <div className="w-full 2xl:w-max 2xl:mx-auto flex flex-col">
            <h2 className="text-3xl lg:text-5xl font-semibold mb-8 lg:mb-12">
              {tArticles("heading", {
                preposition: country.preposition,
                country: country.name,
              })}
            </h2>

            <div className="grid gap-x-12 gap-y-16 grid-cols-1 lg:grid-cols-3">
              {country.posts.map((post) => (
                <PostCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 lg:px-24 xl:px-48 pt-12 lg:pt-32 pb-12 lg:pb-24 flex flex-col items-center jusrtify-center gap-20">
          <h2 className="text-xl lg:text-2xl text-center lg:w-[720px]">
            {tArticles("noArticles")}
          </h2>
          <div className="w-full lg:h-[400px] lg:w-[596px]">
            <ExamsIcon />
          </div>
        </div>
      )}
    </div>
  );
}
