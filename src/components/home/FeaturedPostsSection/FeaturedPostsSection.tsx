import { draftMode } from "next/headers";
import { getTranslations } from "next-intl/server";

import { PostCard } from "@/components/PostCard/PostCard";
import { getPostsByTag } from "@/graphql/queries/get-post-by-tag.query";
import { type AppLocale, Tag } from "@/types/global";

import { FeaturedPostsSectionSkeleton } from "./FeaturedPostsSectionSkeleton";
import { PostcardRail } from "@/components/PostCard/PostcardTail";

export default async function FeaturedPostsSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const t = await getTranslations({ locale, namespace: "Home.Featured" });
  const { isEnabled } = draftMode();

  try {
    const { posts } = await getPostsByTag({
      tag: Tag.FEATUERED,
      limit: 3,
      locale,
      isPreview: isEnabled,
    });

    return (
      <section className="section-layout">
        <h2 className="text-black">{t("title")}</h2>

        <PostcardRail>
          {posts.map((post, i) => (
            <PostCard key={i} post={post} locale={locale} />
          ))}
        </PostcardRail>
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
