import Image from "next/image";
import { AppLocale, Post } from "@/types/global";

import { RichText } from "./RichText/RichText";
import { BlogPostHero, BlogPostHeroLoading } from "./BlogPostHero";
import { NextPost } from "./NextPost";

import beaPic from "../../../../public/images/bea_with_bhan_mi.jpeg";
import davidePic from "../../../../public/images/davide_holding_hero_rat.jpg";
import { StaticImageData } from "next/image";
import { ca } from "date-fns/locale";

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

export const BlogPost: React.FC<BlogPostProps> = ({
  post,
  nextPost,
  locale,
  copy,
}) => {
  const image = getImage(post.author?.name);

  return (
    <div className="flex flex-col">
      <BlogPostHero post={post} />

      <div id="post-content" className="my-10 lg:my-20">
        <p className="text-left px-6 lg:px-0 lg:w-[720px] lg:mx-auto text-black/40 text-4xl">
          {post.smallIntro}
        </p>
      </div>

      <div>
        <RichText richtext={post.richtext} />
      </div>

      <div className="w-full px-6 lg:px-0 lg:w-[720px] mx-auto border-t border-t-gray-200 mt-10 lg:mt-16 pt-10 lg:pt-12 flex flex-row items-center gap-4">
        {image ? (
          <div className="h-16 w-16 rounded-full relative">
            <Image
              className="rounded-full"
              src={image.img}
              alt={image.alt}
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : null}
        <p className="text-lg">
          <span className="text-gray-500">{copy.writtenByText}</span>{" "}
          {post.author?.name}
        </p>
      </div>

      {nextPost && <NextPost post={nextPost} locale={locale} />}
    </div>
  );
};
