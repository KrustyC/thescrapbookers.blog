import Image from "next/image";
import Link from "next-intl/link";

import type { AppLocale, Post as IPost } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";
import { poppins } from "@/utils/fonts";

import { PostDescription } from "./PostDescription";

interface PostProps {
  post: Pick<
    IPost,
    "title" | "href" | "smallIntro" | "thumbnailImage" | "category" | "date"
  >;
  locale: AppLocale;
}

export const PostCardLoading = () => (
  <div className="flex flex-col w-full gap-3">
    <div className="loading-background-animation w-full aspect-square rounded-2xl" />

    <div className="h-10 loading-background-animation" />

    <div className="flex items-center mt-4 h-4">
      <div className="h-4 w-1/2 loading-background-animation" />
      <div className="border-r-2 h-2 mx-2 loading-background-animation" />
      <div className="h-4 w-1/2 loading-background-animation" />
    </div>

    <div className="flex flex-col gap-2 loading-background-animation">
      <div className="h-4 loading-background-animation" />
      <div className="h-4 loading-background-animation" />
      <div className="h-4 loading-background-animation" />
    </div>
  </div>
);

export const PostCard: React.FC<PostProps> = ({
  post: { title, href, smallIntro, thumbnailImage, category, date },
  locale,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <Link
        href={href || "/"}
        className="flex w-full aspect-square relative bg-gray-200 rounded-2xl"
        prefetch={false}
      >
        <Image
          className="rounded-2xl"
          sizes="100%"
          fill
          src={thumbnailImage?.url || ""}
          alt={thumbnailImage?.description || "missing image"}
          loading="lazy"
          style={{ objectFit: "cover" }}
        />
      </Link>

      <Link href={href || "/"}>
        <h3 className="text-2xl lg:text-2xl text-black font-medium mt-3">
          {title}
        </h3>
      </Link>

      <div
        className="flex items-center uppercase tracking-widest text-gray-400 text-regular"
        style={poppins.style}
      >
        <span>{category}</span>
        <div className="border-r-2 h-3 mx-2" />
        <span>
          {date
            ? formatDate({
                date: new Date(date),
                format: getFormat(locale),
                locale,
              })
            : "Missing Date"}
        </span>
      </div>

      {smallIntro ? (
        <PostDescription text={smallIntro} />
      ) : (
        <span>Missing description</span>
      )}
    </div>
  );
};
