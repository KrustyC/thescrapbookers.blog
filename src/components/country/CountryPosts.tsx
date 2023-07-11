import { getPostsByCountry } from "@/graphql/queries/get-posts-by-country.query";
import { AppLocale, Country } from "@/types/global";

import { PostCard, PostCardLoading } from "@/components/PostCard/PostCard";

interface CountryPostsProps {
  country: Required<Pick<Country, "slug" | "name" | "continent">>;
  locale: AppLocale;
}

export const CountryPostsLoading = () => (
  <div className="px-8 lg:px-24 xl:px-48 mt-8 mb-24">
    <div className="w-full 2xl:w-max 2xl:mx-auto flex flex-col">
      <div className="loading-background-animation h-10 w-full lg:w-3/5 loading-background-animation" />

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCardLoading key={i} />
        ))}
      </div>
    </div>
  </div>
);

export default async function CountryPosts({
  country,
  locale,
}: CountryPostsProps) {
  const { posts } = await getPostsByCountry({ country, locale });

  return (
    <div className="px-8 lg:px-24 xl:px-48 mt-8 mb-24">
      <div className="w-full 2xl:w-max 2xl:mx-auto flex flex-col">
        <h2 className="text-3xl lg:text-5xl font-semibold mb-8 lg:mb-12">
          Articles from {country.name}
        </h2>

        <div className="grid gap-x-12 gap-y-16 grid-cols-1 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
