import { Metadata } from "next";
import { draftMode } from "next/headers";
import { unstable_setRequestLocale } from "next-intl/server";

import { ContinentHero } from "@/components/continent/ContinentHero";
import { Country } from "@/components/continent/Country";
import { getContinentWithCountries } from "@/graphql/queries/get-continent-with-countries";
import { AppLocale, Continent } from "@/types/global";
import { LOCALES } from "@/utils/constants";
import { createAlternates } from "@/utils/urls";

interface ContinentPageProps {
  params: {
    continent: string;
    locale: AppLocale;
  };
}

export async function generateMetadata({
  params: { continent: continentSlug, locale },
}: ContinentPageProps): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const { continent } = await getContinentWithCountries({
    slug: continentSlug,
    locale,
    isPreview: isEnabled,
  });

  const title = `${continent.metaTitle} | The Scrapbookers`;
  const description = continent.metaDescription;
  const images = continent.mainImage
    ? [
        {
          url: new URL(continent.mainImage.url || ""),
          height: continent.mainImage.details.height || 569,
          width: continent.mainImage.details.width || 853,
        },
      ]
    : [];

  return {
    title,
    description,
    alternates: createAlternates({ path: `/${continentSlug}` }),
    openGraph: {
      title,
      description,
      images,
      locale,
      url: new URL(
        `/${locale}/${continentSlug}`,
        process.env.NEXT_PUBLIC_BASE_URL
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: continent.name,
      description: continent.metaDescription,
      images,
    },
  };
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/continent`, {
    next: { revalidate: 3600 },
  });

  const { continents } = await res.json();

  return LOCALES.map((locale) => {
    return continents.map((continent: Continent) => ({
      params: {
        continent: continent.slug,
        locale,
      },
    }));
  });
}

export default async function ContinentPage({ params }: ContinentPageProps) {
  unstable_setRequestLocale(params.locale);

  const { isEnabled } = draftMode();
  const { continent } = await getContinentWithCountries({
    slug: params.continent,
    locale: params.locale,
    isPreview: isEnabled,
  });

  return (
    <div>
      <ContinentHero name={continent.name} image={continent.mainImage} />

      {continent.mainDescription ? (
        <div className="bg-primary px-6 lg:px-48 py-12 lg:py-24">
          <p className="text-white font-regular">{continent.mainDescription}</p>
        </div>
      ) : (
        <span>Need to provide a description for the country</span>
      )}

      <div className="flex flex-col gap-y-16 px-8 lg:px-24 xl:px-48 pt-12 lg:pt-32 pb-12 lg:pb-24">
        {continent.countries.map((country, i) => (
          <Country
            key={i}
            country={country}
            continentSlug={continent.slug || ""}
          />
        ))}
      </div>
    </div>
  );
}
