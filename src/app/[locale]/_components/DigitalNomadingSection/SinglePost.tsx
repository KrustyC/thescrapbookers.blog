import { motion, Variants } from "framer-motion";
import Image from "next/image";

import type { AppLocale, Post as IPost } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";
import { Link } from "@/i18n/navigation";
import { smoothSpring } from "@/utils/transitions";

interface PostProps {
  post: Pick<
    IPost,
    "title" | "href" | "smallIntro" | "thumbnailImage" | "category" | "date"
  >;
  locale: AppLocale;
}

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

export const SinglePost: React.FC<PostProps> = ({
  post: { title, href, smallIntro, thumbnailImage, category, date },
  locale,
}) => {
  return (
    <Link href={href || "/"}>
      <motion.div
        variants={variants}
        className="w-full aspect-square relative bg-gray-200 rounded-2xl drop-shadow-xl overflow-hidden border-black"
      >
        <Image
          fill
          src={thumbnailImage?.url || ""}
          alt={thumbnailImage?.description || "missing image"}
          title={thumbnailImage?.title || "missing image"}
          loading="lazy"
          style={{ objectFit: "cover" }}
        />

        <div className="absolute bottom-0 right-0 left-0 flex flex-col w-full p-5 bg-gradient-to-r from-black to-white/5">
          <div className="flex items-center uppercase tracking-widest text-sm lg:text-base text-white">
            <span>{category}</span>
            <div className="border-r-2 border-white h-3 mx-2" />

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

          <h3 className="text-xl lg:text-2xl text-white font-semibold my-2">
            {title}
          </h3>

          <span className="hidden lg:block text-sm line-clamp-4 xl:line-clamp-5 text-white">
            {smallIntro}
          </span>
        </div>
      </motion.div>
    </Link>
  );
};
