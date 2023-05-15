import { Metadata } from "next";
import { AppLocale } from "types/global";
import { getContinent } from "utils/api";

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

  return (
    <div className="flex flex-col">
      <div className="w-[1024px] mx-auto py-24">
        <h1 className="text-6xl font-bold">{continent.name}</h1>

        {continent.mainDescription && (
          <div className="text-xl">{continent.mainDescription}</div>
        )}
      </div>
    </div>
  );
}
