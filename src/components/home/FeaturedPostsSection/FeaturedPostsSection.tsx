import { getTranslator } from "next-intl/server";

import { getPosts } from "@/api";
import type { AppLocale } from "@/types/global";
import { PostCard } from "@/components/PostCard/PostCard";

import { FeaturedPostsSectionSkeleton } from "./FeaturedPostsSectionSkeleton";

export default async function FeaturedPostsSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const t = await getTranslator(locale, "Home.Featured");

  try {
    const { posts } = await getPosts({ tag: "featured", locale });

    return (
      <section className="section-layout">
        <h2 className="text-black">{t("title")}</h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-8 lg:gap-16">
          {posts.map((post, i) => (
            <PostCard key={i} post={post} locale={locale} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    return (
      <section className="section-layout">
        <h2 className="text-black">{t("title")}</h2>

        <div className="flex flex-col">
          <h4 className="text-3xl mb-4">{t("error1")}</h4>
          <span className="text-xl">{t("error2")}</span>
        </div>
      </section>
    );
  }
}

export { FeaturedPostsSectionSkeleton };
