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

export async function generateMetadata({
  params: { locale },
}: HomePageProps): Promise<Metadata> {
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
          url: `${process.env.baseUrl}/images/about-us.jpg`,
          height: 569,
          width: 853,
        },
      ],
      locale,
    },
  };
}

export default function Home({ params }: { params: { locale: AppLocale } }) {
  return (
    <div className="flex flex-col">
      <Hero locale={params.locale}/>

      <Suspense fallback={<FeaturedPostsSectionSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <FeaturedPostsSection locale={params.locale} />
      </Suspense>

      <Suspense fallback={<SmallNotesSectionSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <SmallNotesSection locale={params.locale} />
      </Suspense>

      {/* <CategoriesSection /> */}

      <AboutUsSection />

      <Footer />
    </div>
  );
}
