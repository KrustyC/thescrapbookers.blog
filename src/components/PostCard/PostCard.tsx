"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import type { AppLocale, Post as IPost } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";
import { smoothSpring } from "@/utils/transitions";

interface PostProps {
  post: Pick<IPost, "title" | "href" | "thumbnailImage" | "category" | "date">;
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

const variants: Variants = {
  offscreen: {
    y: 40,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: smoothSpring,
  },
};

export const PostCard: React.FC<PostProps> = ({
  post: { title, href, thumbnailImage, category, date },
  locale,
}) => {
  return (
    <motion.div variants={variants} className="flex flex-col w-full gap-2">
      <Link
        href={href || "/"}
        className="flex w-full aspect-video relative bg-gray-200 rounded-2xl"
        prefetch={false}
      >
        <Image
          className="rounded-2xl"
          sizes="100%"
          fill
          src={thumbnailImage?.url || ""}
          alt={thumbnailImage?.description || "missing image"}
          title={thumbnailImage?.title || "missing image"}
          loading="lazy"
          style={{ objectFit: "cover" }}
        />
      </Link>

      <motion.div
        variants={variants}
        className="px-4 mt-2 flex items-center uppercase tracking-widest text-gray-400 text-sm font-poppins"
      >
        <span className="text-primary">{category}</span>
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
      </motion.div>

      <motion.div className="px-4" variants={variants}>
        <Link href={href || "/"}>
          <h3 className="text-lg 2xl:text-xl text-black font-medium">
            {title}
          </h3>
        </Link>
      </motion.div>
    </motion.div>
  );
};
