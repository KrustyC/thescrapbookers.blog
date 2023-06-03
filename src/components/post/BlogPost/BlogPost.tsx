import { AppLocale, Post } from "@/types/global";

import { RichText } from "./RichText/RichText";
import { BlogPostHero } from "./BlogPostHero";
import { NextPost } from "./NextPost";

interface BlogPostProps {
  post: Post;
  nextPost?: Pick<Post, "title" | "slug" | "date" | "mainImage" | "smallIntro">;
  locale: AppLocale;
  copy: {
    writtenByText: string;
  };
}

export const BlogPostLoading = () => <div>Loading</div>;

export const BlogPost: React.FC<BlogPostProps> = ({
  post,
  nextPost,
  locale,
  copy,
}) => {
  return (
    <div className="flex flex-col">
      <BlogPostHero post={post} />

      <div id="post-content" className="pt-24">
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
