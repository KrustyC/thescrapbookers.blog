import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AppLocale } from "types/global";

interface ContinentPageProps {
  params: {
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

  // @TODO Here the data should come from a continent fetched directly from Contentful

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
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

export default function ContinentPage({
  params,
}: {
  params: { locale: AppLocale };
}) {
  return (
    <div className="flex flex-col">
      Welcome to the page for Asia! Have amazing fun here!
    </div>
  );
}
