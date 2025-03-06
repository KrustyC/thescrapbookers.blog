import { motion, Variants } from "framer-motion";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import type { AppLocale, Post as IPost } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";
import { smoothSpring } from "@/utils/transitions";

type DigitalNomadingPost = Pick<
  IPost,
  "title" | "href" | "smallIntro" | "thumbnailImage" | "category" | "date"
>;

interface PostProps {
  posts: DigitalNomadingPost[];
  locale: AppLocale;
}

const imageVariants: Variants = {
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

const textVariants: Variants = {
  offscreen: {
    x: 40,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: smoothSpring,
  },
};

export const DigitalNomadingCarousel: React.FC<PostProps> = ({
  posts,
  locale,
}) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8">
      {posts.map((post) => (
        <Link key={post.href} href={post.href || "/"} className="flex-1">
          <div className="flex flex-col gap-2">
            <motion.div
              variants={imageVariants}
              className="w-full h-[100px] lg:h-[300px] xl:h-[350px] relative rounded-xl drop-shadow-xl"
            >
              <Image
                fill
                className="rounded-xl bg-gray-300"
                src={post.thumbnailImage?.url || ""}
                alt={post.thumbnailImage?.description || "missing image"}
                title={post.thumbnailImage?.title || "missing image"}
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
            </motion.div>

            <motion.div
              variants={textVariants}
              className="px-2 2xl:px-4 flex items-center uppercase tracking-widest text-sm text-white mt-2"
            >
              <span>{post.category}</span>
              <div className="border-r-2 border-white h-3 mx-2" />

              <span>
                {post.date
                  ? formatDate({
                      date: new Date(post.date),
                      format: getFormat(locale),
                      locale,
                    })
                  : "Missing Date"}
              </span>
            </motion.div>
            <motion.h3
              variants={textVariants}
              className="px-2 2xl:px-4 text-sm lg:text-base 2xl:text-xl text-black font-semibold"
            >
              {post.title}
            </motion.h3>
          </div>
        </Link>
      ))}
    </div>
  );
};
