import { Metadata } from "next";

import { getContinent, getCountriesForContinent } from "@/api";
import { ContinentHero } from "@/components/continent/ContinentHero";
import { Country } from "@/components/continent/Country";
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
  const { continent } = await getContinent(continentSlug, locale);

  const title = continent.name;
  const description = continent.metaDescription;
  const images = [
    {
      url: new URL(continent.mainImage.url),
      height: continent.mainImage.details.height || 569,
      width: continent.mainImage.details.width || 853,
    },
  ];

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
  const { continent } = await getContinent(params.continent, params.locale);
  const { countries } = await getCountriesForContinent(
    params.continent,
    params.locale
  );

  return (
    <div>
      <ContinentHero name={continent.name} image={continent.mainImage} />
      <div className="flex flex-col gap-y-16 px-8 lg:px-24 xl:px-48 pt-12 lg:pt-32 pb-12 lg:pb-24">
        {countries.map((country, i) => (
          <Country key={i} country={country} />
        ))}
      </div>
    </div>
  );
}
