import Image from "next/image";

import { ShareButton } from "@/components/ShareButton";
import { AppLocale, Author, Post } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";

import beaPic from "../../../../public/images/bea_near_a_wat.webp";
import davidePic from "../../../../public/images/davide_holding_hero_rat.webp";

import { RichText } from "./RichText/RichText";
import { BlogPostHero, BlogPostHeroLoading } from "./BlogPostHero";
import { NextPost } from "./NextPost";

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

function getImage(authorName: string | undefined) {
  switch (authorName) {
    case "Davide Crestini":
      return {
        img: davidePic,
        alt: "Davide smiling while holding a rat",
      };
    case "Beatrice Cox":
      return {
        img: beaPic,
        alt: "Bea smiling while holding a bhan mi",
      };
    default:
      return null;
  }
}

interface ArticleAuthorAndPublishDateProps {
  author: Author;
  publishedDate: Date;
  locale: AppLocale;
  timeToRead: number;
  copy: {
    timeToRead: string;
    shareText: string;
    writtenByText: string;
  };
}

const ArticleAuthorAndPublishDate: React.FC<
  ArticleAuthorAndPublishDateProps
> = ({ author, timeToRead, publishedDate, copy, locale }) => {
  const authorImage = getImage(author.name);

  return (
    <div className="flex justify-between items-center mt-10 lg:mt-16 lg:w-[720px] mx-6 lg:mx-auto">
      <div className="flex gap-3 md:gap-4">
        <div>
          {authorImage ? (
            <div className="h-14 w-14 lg:h-16 lg:w-16 rounded-full relative">
              <Image
                className="rounded-full"
                src={authorImage.img}
                alt={authorImage.alt}
                fill
                sizes="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-center gap-1 text-sm md:text-base">
          <p>
            <span className="text-gray-500">{copy.writtenByText}</span>{" "}
            {author?.name}
          </p>

          <p className="text-xs md:text-sm">
            {formatDate({
              date: new Date(publishedDate),
              format: getFormat(locale),
              locale,
            })}{" "}
            • {timeToRead} {copy.timeToRead}
          </p>
        </div>
      </div>

      <ShareButton title="The Scrapbookers" text={copy.shareText} />
    </div>
  );
};

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

      {nextPost && <NextPost post={nextPost} locale={locale} />}
    </div>
  );
};
