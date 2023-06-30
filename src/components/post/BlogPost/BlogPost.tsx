import { AppLocale, Post } from "@/types/global";

import { RichText } from "./RichText/RichText";
import { BlogPostHero, BlogPostHeroLoading } from "./BlogPostHero";
import { NextPost } from "./NextPost";

interface BlogPostProps {
  post: Post;
  nextPost?: Pick<Post, "title" | "slug" | "date" | "mainImage" | "smallIntro">;
  locale: AppLocale;
  copy: {
    writtenByText: string;
  };
}

export const BlogPostLoading = () => (
  <div className="flex felx-full">
    <BlogPostHeroLoading />
  </div>
);

export const BlogPost: React.FC<BlogPostProps> = ({
  post,
  nextPost,
  locale,
  copy,
}) => {
  return (
    <div className="flex flex-col">
      <BlogPostHero post={post} />

      <div id="post-content" className="my-10 lg:my-20">
        <p className="text-left px-6 lg:px-0 lg:w-[720px] lg:mx-auto text-black italic">
          {post.smallIntro}
        </p>
      </div>

      {/* <div id="post-content" className="pt-24"> */}
      <div>
        <RichText richtext={post.richtext} />
      </div>

      <p className="w-full px-6 lg:px-0 lg:w-[720px] mx-auto border-t border-t-gray-200 mt-10 lg:mt-16 pt-10 lg:pt-16 text-2xl">
        <span className="text-gray-500">{copy.writtenByText}</span>{" "}
        {post.author.name}
      </p>

      {nextPost && <NextPost post={nextPost} locale={locale} />}
    </div>
  );
};
