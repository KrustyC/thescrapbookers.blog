import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/types/global";
import { getPostsByTag } from "@/utils/api";

import { SectionWithTitle } from "../SectionWIthTitle/SectionWithTitle";

import { DigitalNomadingSectionSkeleton } from "./DigitalNomadingSectionSkeleton";
import { Post } from "./Post";

export default async function DigitalNomadingSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const t = await getTranslations("Home.DigitalNomading");

  try {
    const { posts } = await getPostsByTag({ tag: "featured", locale });

    return (
      <SectionWithTitle title={t("title")} primaryBackground withExtraMarginTop>
        <div className="flex flex-col md:flex-row gap-12 md:gap-8 lg:gap-16">
          {posts.map((post, i) => (
            <Post key={i} post={post} locale={locale} />
          ))}
        </div>
      </SectionWithTitle>
    );
  } catch (error) {
    return (
      <SectionWithTitle title={t("title")} primaryBackground>
        <div className="flex flex-col">
          <h4 className="text-3xl mb-4">{t("error1")}</h4>
          <span className="text-xl">{t("error2")}</span>
        </div>
      </SectionWithTitle>
    );
  }
}

export { DigitalNomadingSectionSkeleton };
