import { draftMode } from "next/headers";
import { getTranslations } from "next-intl/server";

import { getPostsByTag } from "@/graphql/queries/get-post-by-tag.query";
import { type AppLocale, Tag } from "@/types/global";
import { DIGITAL_NOMADING_POSTS_ORDERED_SLUGS } from "@/utils/constants";
import { sortItemsWithSlug } from "@/utils/item-with-slug-sorter";

import { DigitalNomadingSectionContent } from "./DigitalNomadingSectionContent";
import { DigitalNomadingSectionSkeleton } from "./DigitalNomadingSectionSkeleton";

interface DigitalNomadingSectionProps {
  locale: AppLocale;
}

export default async function DigitalNomadingSection({
  locale,
}: DigitalNomadingSectionProps) {
  const { isEnabled } = await draftMode();
  const t = await getTranslations({
    locale,
    namespace: "Home.DigitalNomading",
  });

  try {
    const { posts } = await getPostsByTag({
      tag: Tag.DIGITAL_NOMADING_HIGHLIGHTED,
      locale,
      limit: 3,
      isPreview: isEnabled,
    });

    if (posts.length === 0) return null;

    const orderedPost = sortItemsWithSlug(
      posts,
      DIGITAL_NOMADING_POSTS_ORDERED_SLUGS
    );

    return (
      <DigitalNomadingSectionContent
        title={t("title")}
        subtitle={t("subtitle")}
        locale={locale}
        posts={orderedPost}
      />
    );
  } catch (error) {
    return null;
  }
}

export { DigitalNomadingSectionSkeleton };
