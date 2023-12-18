import { Suspense } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/Footer";
import { AboutUsSection } from "@/components/home/AboutUsSection";
import CountriesCarouselSection, {
  CountriesCarouselSectionSkeleton,
} from "@/components/home/CountriesCarouselSection/CountriesCarouselSection";
import DigitalNomadingSection, {
  DigitalNomadingSectionSkeleton,
} from "@/components/home/DigitalNomadingSection/DigitalNomadingSection";
import FeaturedPostsSection, {
  FeaturedPostsSectionSkeleton,
} from "@/components/home/FeaturedPostsSection/FeaturedPostsSection";
import { Hero } from "@/components/home/Hero/Hero";
import { HighlightSection } from "@/components/home/HighlightSection";
import { AppLocale } from "@/types/global";
import { LOCALES } from "@/utils/constants";
import { createAlternates } from "@/utils/urls";

// const DynamicVideo = dynamic(() => import("../../components/home/VideoPlayer"));
const DynamicVideo = dynamic(() => import("../../components/home/Video"));

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: createAlternates({ path: "" }),
  };
}

export default function Home({ params }: { params: { locale: AppLocale } }) {
  unstable_setRequestLocale(params.locale);

  const videoCopy = useTranslations("Home.Video");

  return (
    <>
      <div className="flex flex-col">
        <Hero locale={params.locale} />

        <Suspense fallback={<FeaturedPostsSectionSkeleton />}>
          <FeaturedPostsSection locale={params.locale} />
        </Suspense>

        <DynamicVideo text={videoCopy("text")} />

        <Suspense fallback={<DigitalNomadingSectionSkeleton />}>
          <DigitalNomadingSection locale={params.locale} />
        </Suspense>

        <Suspense fallback={<CountriesCarouselSectionSkeleton />}>
          <CountriesCarouselSection locale={params.locale} />
        </Suspense>

        <AboutUsSection />

        <HighlightSection />

        <div className="-mt-[160px] 2xl:-mt-[200px] z-50 block">
          <Footer locale={params.locale} />
        </div>
      </div>
    </>
  );
}
