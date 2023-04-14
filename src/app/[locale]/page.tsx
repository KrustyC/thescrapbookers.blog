import { Suspense } from "react";
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

export const metadata = {
  title: "Home | The Scrapbookers",
};

export default function Home({ params }: { params: { locale: AppLocale } }) {
  console.log(params);
  return (
    <div className="flex flex-col">
      <Hero />

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
