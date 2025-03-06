import { Suspense } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { AppLocale } from "@/types/global";
import { createAlternates } from "@/utils/urls";

import { AboutUsSection } from "./_components/AboutUsSection";
import CountriesCarouselSection, {
  CountriesCarouselSectionSkeleton,
} from "./_components/CountriesCarouselSection/CountriesCarouselSection";
import DigitalNomadingSection, {
  DigitalNomadingSectionSkeleton,
} from "./_components/DigitalNomadingSection/DigitalNomadingSection";
import FeaturedPostsSection, {
  FeaturedPostsSectionSkeleton,
} from "./_components/FeaturedPostsSection/FeaturedPostsSection";
import { Hero } from "./_components/Hero/Hero";
import { HighlightSection } from "./_components/HighlightSection";

// const DynamicVideo = dynamic(() => import("../../components/home/VideoPlayer"));
const DynamicVideo = dynamic(() => import("./_components/Video"));

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: createAlternates({ path: "" }) };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const locale = (await params).locale;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Home.Video" });

  return (
    <>
      <div className="flex flex-col">
        <Hero locale={locale} />

        <Suspense fallback={<FeaturedPostsSectionSkeleton />}>
          <FeaturedPostsSection locale={locale} />
        </Suspense>

        <DynamicVideo text={t("text")} />

        <Suspense fallback={<DigitalNomadingSectionSkeleton />}>
          <DigitalNomadingSection locale={locale} />
        </Suspense>

        <Suspense fallback={<CountriesCarouselSectionSkeleton />}>
          <CountriesCarouselSection locale={locale} />
        </Suspense>

        <AboutUsSection />

        <HighlightSection />

        <div className="-mt-[160px] 2xl:-mt-[200px] z-50 block">
          <Footer locale={locale} />
        </div>
      </div>
    </>
  );
}
