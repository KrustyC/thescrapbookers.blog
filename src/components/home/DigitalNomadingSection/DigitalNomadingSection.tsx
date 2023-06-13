import { getTranslations } from "next-intl/server";

import { getPostDigitalNomadingHighlightedPost } from "@/api";
import type { AppLocale } from "@/types/global";

import { SectionWithTitle } from "../SectionWIthTitle/SectionWithTitle";

import { DigitalNomadingSectionSkeleton } from "./DigitalNomadingSectionSkeleton";
import { SinglePost } from "./SinglePost";

export default async function DigitalNomadingSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const t = await getTranslations("Home.DigitalNomading");

  try {
    const { post } = await getPostDigitalNomadingHighlightedPost({ locale });

    if (!post) return null;

    return (
      <section className="flex flex-col pt-8 pb-16 md:py-16 lg:py-20 px-6 lg:px-16 xl:px-48 bg-white pt-16 md:py-16 lg:py-20">
        <SinglePost post={post} locale={locale} />
      </section>
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
