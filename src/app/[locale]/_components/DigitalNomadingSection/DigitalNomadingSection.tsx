import { draftMode } from "next/headers";

import { getPostsByTag } from "@/graphql/queries/get-post-by-tag.query";
import { type AppLocale, Tag } from "@/types/global";
import { DIGITAL_NOMADING_POSTS_ORDERED_SLUGS } from "@/utils/constants";
import { sortItemsWithSlug } from "@/utils/item-with-slug-sorter";

import { DigitalNomadingCarousel } from "./DigitalNomadingCarousel";
import { DigitalNomadingSectionSkeleton } from "./DigitalNomadingSectionSkeleton";
import { SinglePost } from "./SinglePost";

export default async function DigitalNomadingSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const { isEnabled } = draftMode();
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
      <section className="bg-primary flex flex-col py-16 lg:py-20 px-6 lg:px-16 xl:px-48 2xl:px-48 pt-16 md:py-16 gap-8 md:gap-16">
        <h2 className="text-black text-3xl lg:text-5xl !font-semibold">
          Digital Nomading
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 overflow-scroll">
          <div className="lg:flex-1">
            <SinglePost post={orderedPost[0]} locale={locale} />
          </div>
          <div className="lg:flex-1">
            <DigitalNomadingCarousel posts={orderedPost.slice(1)} />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    return null;
  }
}

export { DigitalNomadingSectionSkeleton };
