import { Suspense } from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "components/Hero";
import FeaturedPostsSection, {
  FeaturedPostsSectionSkeleton,
} from "components/FeaturedPostsSection/FeaturedPostsSection";
import SmallNotesSection, {
  SmallNotesSectionSkeleton,
} from "components/SmallNotesSection/SmallNotesSection";
import { AboutUsSection } from "components/AboutUsSection";
import { Footer } from "components/Footer";
import { AppLocale } from "types/global";

interface HomePageProps {
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
}: HomePageProps): Promise<Metadata> {
  const t = await getTranslations("Home.Metadata");
  const baseUrl = process.env.baseUrl as string;

  return {
    title: t("title"),
    description: t("description"),
    authors: [
      { name: "Davide Crestini", url: "https://dcrestini.me" },
      { name: "Beatrice Cox", url: "https://beatricecox.com" },
    ],
    alternates: {
      canonical: new URL(baseUrl),
      languages: { it: new URL(`${baseUrl}/it`) },
    },
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

export default function Home({ params }: { params: { locale: AppLocale } }) {
  return (
    <div className="flex flex-col">
      <Hero locale={params.locale} />

      <Suspense fallback={<FeaturedPostsSectionSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <FeaturedPostsSection locale={params.locale} />
      </Suspense>

      <Suspense fallback={<SmallNotesSectionSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <SmallNotesSection locale={params.locale} />
      </Suspense>

      <AboutUsSection />

      <Footer locale={params.locale} />
    </div>
  );
}
