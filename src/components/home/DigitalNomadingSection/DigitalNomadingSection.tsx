import { getPostDigitalNomadingHighlightedPost } from "@/api";
import type { AppLocale } from "@/types/global";

import { DigitalNomadingSectionSkeleton } from "./DigitalNomadingSectionSkeleton";
import { SinglePost } from "./SinglePost";

export default async function DigitalNomadingSection({
  locale,
}: {
  locale: AppLocale;
}) {
  try {
    const { post } = await getPostDigitalNomadingHighlightedPost({ locale });

    if (!post) return null;

    return (
      <section className="bg-primary flex flex-col py-16 lg:py-20 px-6 lg:px-16 xl:px-48 pt-16 md:py-16 lg:py-20">
        <SinglePost post={post} locale={locale} />
      </section>
    );
  } catch (error) {
    return null;
  }
}

export { DigitalNomadingSectionSkeleton };
