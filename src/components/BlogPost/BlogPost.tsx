import { useTranslations } from "next-intl";

import { NewsletterForm } from "@/components/NewsletterForm";
import { AppLocale, Post } from "@/types/global";

import { NextPost } from "../NextPost";

import { RichText } from "./RichText/RichText";
import { ArticleAuthorAndPublishDate } from "./ArticleAuthorAndPublishDate";
import { BlogPostHero, BlogPostHeroLoading } from "./BlogPostHero";

interface BlogPostProps {
  post: Post;
  nextPost?: Pick<Post, "title" | "slug" | "date" | "mainImage" | "smallIntro">;
  locale: AppLocale;
  copy: {
    timeToRead: string;
    shareText: string;
    writtenByText: string;
  };
}

export const BlogPost: React.FC<BlogPostProps> = ({
  post,
  nextPost,
  locale,
  copy,
}) => {
  const blogPostNewsletter = useTranslations("BlogPost.Newsletter");
  const newsletter = useTranslations("Global.NewsletterForm");

  return (
    <div className="flex flex-col">
      <BlogPostHero post={post} />

      {post.author && post.date && (
        <ArticleAuthorAndPublishDate
          author={post.author}
          publishedDate={post.date}
          timeToRead={post.timeToRead || 1}
          copy={copy}
          locale={locale}
        />
      )}

      <div id="post-content" className="my-10 lg:my-16">
        <p className="text-left px-6 lg:px-0 lg:w-[920px] lg:mx-auto text-black/50 text-xl">
          {post.smallIntro}
        </p>
      </div>

      <div>
        <RichText richtext={post.richtext} />
      </div>

      <div className="w-full px-6 lg:px-0 lg:w-[720px] mx-auto border-t border-t-gray-200 mt-10 lg:mt-16" />

      <div className="flex flex-col w-full px-6 lg:px-0 lg:w-[720px] mx-auto mt-10">
        <h5 className="font-bold text-2xl">{blogPostNewsletter("title")}</h5>
        <p className="mt-1 mb-6">{blogPostNewsletter("description")}</p>

        <NewsletterForm
          messages={{
            inputPlaceholder: newsletter("inputPlaceholder"),
            inputError: newsletter("inputError"),
            ctaText: newsletter("cta"),
            dialogs: {
              success: {
                title: newsletter("dialogs.success.title"),
                message: newsletter("dialogs.success.message"),
                cta: newsletter("dialogs.success.cta"),
              },
              error: {
                title: newsletter("dialogs.error.title"),
                generic: newsletter("dialogs.error.generic"),
                cta: newsletter("dialogs.error.cta"),
                userAlreadyExist: newsletter("dialogs.error.userAlreadyExist"),
              },
            },
          }}
        />
      </div>

      {nextPost && <NextPost post={nextPost} locale={locale} />}
    </div>
  );
};

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
