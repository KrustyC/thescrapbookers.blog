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

    <div className="w-full lg:w-[720px] lg:mx-auto flex flex-col py-10 lg:py-20 px-6 lg:px-0">
      {new Array(8).fill(null).map((_, i) => (
        <div key={i} className="mb-4 h-2 w-full bg-gray-300" />
      ))}

      <br />
      <br />

      {new Array(8).fill(null).map((_, i) => (
        <div key={i} className="mb-4 h-4 w-full bg-gray-300" />
      ))}

      <br />
      <br />

      {new Array(8).fill(null).map((_, i) => (
        <div key={i} className="mb-4 h-4 w-full  bg-gray-300" />
      ))}
    </div>
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

      <div>
        <RichText richtext={post.richtext} />
      </div>

      <p className="w-full px-6 lg:px-0 lg:w-[720px] mx-auto border-t border-t-gray-200 mt-10 lg:mt-16 pt-10 lg:pt-16 text-2xl">
        <span className="text-gray-500">{copy.writtenByText}</span>{" "}
        {post.author?.name}
      </p>

      {nextPost && <NextPost post={nextPost} locale={locale} />}
    </div>
  );
};
