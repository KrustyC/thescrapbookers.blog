import { Metadata } from "next";
import { draftMode } from "next/headers";

import { ContinentHero } from "@/components/continent/ContinentHero";
import { Country } from "@/components/continent/Country";
import { getContinentWithCountries } from "@/graphql/queries/get-continent-with-countries";
import { AppLocale } from "@/types/global";
import { createAlternates } from "@/utils/urls";

interface ContinentPageProps {
  params: {
    continent: string;
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
  params: { continent: continentSlug, locale },
}: ContinentPageProps): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const { continent } = await getContinentWithCountries({
    slug: continentSlug,
    locale,
    isPreview: isEnabled,
  });

  const title = `${continent.name} | The Scrapbookers`;
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
    },
    twitter: {
      card: "summary_large_image",
      title: continent.name,
      description: continent.metaDescription,
      images,
    },
  };
}

export default async function ContinentPage({ params }: ContinentPageProps) {
  const { isEnabled } = draftMode();
  const { continent } = await getContinentWithCountries({
    slug: params.continent,
    locale: params.locale,
    isPreview: isEnabled,
  });

  return (
    <div>
      <ContinentHero name={continent.name} image={continent.mainImage} />
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
