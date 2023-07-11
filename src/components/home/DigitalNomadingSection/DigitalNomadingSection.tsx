import { getPostsByTag } from "@/graphql/queries/get-post-by-tag.query";
import { type AppLocale,Tag } from "@/types/global";

import { DigitalNomadingSectionSkeleton } from "./DigitalNomadingSectionSkeleton";
import { SinglePost } from "./SinglePost";

export default async function DigitalNomadingSection({
  locale,
}: {
  locale: AppLocale;
}) {
  try {
    const { posts } = await getPostsByTag({
      tag: Tag.DIGITAL_NOMADING_HIGHLIGHTED,
      locale,
      limit: 1,
      isPreview: false,
    });

    if (posts.length === 0) return null;

    return (
      <section className="bg-primary flex flex-col py-16 lg:py-20 px-6 lg:px-16 xl:px-48 pt-16 md:py-16">
        <SinglePost post={posts[0]} locale={locale} />
      </section>
    );
  } catch (error) {
    return null;
  }
}

export { DigitalNomadingSectionSkeleton };
