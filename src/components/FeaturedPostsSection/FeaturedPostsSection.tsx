import { getTranslations } from "next-intl/server";
import type { AppLocale, Post as IPost } from "types/global";
import { SectionWithTitle } from "../SectionWIthTitle/SectionWithTitle";
import { Post } from "./Post";
import { FeaturedPostsSectionSkeleton } from "./FeaturedPostsSectionSkeleton";

async function getFeaturedPosts(
  locale: AppLocale
): Promise<{ posts: IPost[] }> {
  const url = `${process.env.baseUrl}/${locale}/post/api?tag=featured`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  // const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function FeaturedPostsSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const { posts } = await getFeaturedPosts(locale);

  const t = await getTranslations("Home.Featured");

  return (
    <SectionWithTitle title={t("title")}>
      <div className="flex flex-col lg:flex-row gap-y-16 lg:gap-x-16">
        {posts.map((post, i) => (
          <Post key={i} post={post} locale={locale} />
        ))}
      </div>
    </SectionWithTitle>
  );
}

export { FeaturedPostsSectionSkeleton };
