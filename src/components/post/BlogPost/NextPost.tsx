import Image from "next/image";
import Link from "next-intl/link";

import { AppLocale, Post } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";
import { poppins } from "@/utils/fonts";

interface NextPostHeroProps {
  post: Pick<Post, "title" | "slug" | "date" | "mainImage" | "smallIntro">;
  locale: AppLocale;
}

export const NextPostLoading = () => <div>Loading</div>;

export const NextPost: React.FC<NextPostHeroProps> = ({ post, locale }) => {
  return (
    <div className="w-full lg:w-[920px] 2xl:w-max mx-auto mt-10 lg:mt-24 flex flex-col">
      <Link
        href={`/post/${post.slug}`}
        className="w-full h-[380px] relative loading-background"
      >
        <Image
          sizes="100%"
          fill
          src={post.mainImage.url}
          alt={post.mainImage.description}
          style={{ objectFit: "cover" }}
        />
      </Link>

      <div className="flex flex-col px-6 lg:px-0">
        <div
          className="mt-8 mb-6 text-gray-400 uppercase tracking-wider font-600 rounded-full"
          style={poppins.style}
        >
          <span>
            {formatDate({
              date: new Date(post.date),
              format: getFormat(locale),
              locale,
            })}
          </span>
        </div>

        <Link href={`/post/${post.slug}`}>
          <h1 className="text-5xl font-semibold text-black">{post.title}</h1>
        </Link>

        <span className="text-xl mt-8 text-gray-500 w-full xl:w-3/4">
          {post.smallIntro}
        </span>
      </div>
    </div>
  );
};