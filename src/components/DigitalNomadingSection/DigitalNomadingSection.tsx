import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/types/global";
import { getPostsByTag } from "@/utils/api";

import { SectionWithTitle } from "../SectionWIthTitle/SectionWithTitle";

import { Carousel } from "./Carousel";
import { DigitalNomadingSectionSkeleton } from "./DigitalNomadingSectionSkeleton";
import { SinglePost } from "./SinglePost";

export default async function DigitalNomadingSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const t = await getTranslations("Home.DigitalNomading");

  try {
    const [hilghlitedPostResult, otherPostsResult] = await Promise.all([
      getPostsByTag({ tag: "featured", locale }),
      getPostsByTag({ tag: "featured", locale }),
    ]);

    const hilghlitedPost = hilghlitedPostResult.posts[0];
    const { posts: otherPosts } = otherPostsResult;

    return (
      <SectionWithTitle title={t("title")} primaryBackground>
        <div className="flex flex-col lg:flex-row gap-y-16 lg:gap-x-16">
          <div className="w-1/2">
            <SinglePost post={hilghlitedPost} locale={locale} />
            {/* {posts.map((post, i) => (
            <Post key={i} post={post} locale={locale} />
          ))} */}
          </div>
          <div className="w-1/2 bg-[red]">
            <Carousel
              posts={[...otherPosts, ...otherPosts]}
              locale={locale}
            />
          </div>
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

export { DigitalNomadingSectionSkeleton };
