import { getTranslations } from "next-intl/server";

import { SectionWithTitle } from "../SectionWIthTitle/SectionWithTitle";

import { FeaturedPostsSectionSkeleton } from "./FeaturedPostsSectionSkeleton";
import { Post } from "./Post";

import type { AppLocale } from "@/types/global";
import { getPostsByTag } from "@/utils/api";

export default async function FeaturedPostsSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const t = await getTranslations("Home.Featured");

  try {
    const { posts } = await getPostsByTag({ tag: "featured", locale });

    return (
      <SectionWithTitle title={t("title")}>
        <div className="flex flex-col lg:flex-row gap-y-16 lg:gap-x-16">
          {posts.map((post, i) => (
            <Post key={i} post={post} locale={locale} />
          ))}
        </div>
      </SectionWithTitle>
    );
  } catch (error) {
    return (
      <SectionWithTitle title={t("title")}>
        <div className="flex flex-col">
          <h4 className="text-3xl mb-4">{t("error1")}</h4>
          <span className="text-xl">{t("error2")}</span>
        </div>
      </SectionWithTitle>
    );
  }
}

export { FeaturedPostsSectionSkeleton };
