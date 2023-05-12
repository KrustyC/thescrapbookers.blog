import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
  params: { locale },
}: ContinentPageProps): Promise<Metadata> {
  const t = await getTranslations("Home.Metadata");

  return {
    title: t("title"),
    description: t("description"),
    authors: [
      { name: "Davide Crestini", url: "https://dcrestini.me" },
      { name: "Beatrice Cox", url: "https://beatricecox.com" },
    ],
    creator: "Davide Crestini",
    publisher: "Beatrice Cox",
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "The Scrapbookers",
      images: [
        {
          url: `${process.env.baseUrl}/images/the_scrapbookers.png`,
          height: 569,
          width: 853,
        },
      ],
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: `${process.env.baseUrl}/images/the_scrapbookers.png`,
          height: 569,
          width: 853,
        },
      ],
    },
  };
}

export default async function ContinentPage({ params }: ContinentPageProps) {
  const { continent } = await getContinent(params.continent, params.locale);
  const res = await getContinent(params.continent, params.locale);

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
