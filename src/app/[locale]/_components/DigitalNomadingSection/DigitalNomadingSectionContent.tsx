"use client";

import { motion, Variants } from "framer-motion";

import { type AppLocale, ShortPost } from "@/types/global";
import { smoothSpring } from "@/utils/transitions";

import { DigitalNomadingCarousel } from "./DigitalNomadingCarousel";
import { SinglePost } from "./SinglePost";

const titleVariants: Variants = {
  offscreen: {
    x: -40,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: smoothSpring,
  },
};

interface DigitalNomadingSectionContentProps {
  title: string;
  subtitle: string;
  locale: AppLocale;
  posts: ShortPost[];
}

export const DigitalNomadingSectionContent: React.FC<
  DigitalNomadingSectionContentProps
> = ({ title, subtitle, locale, posts }) => {
  return (
    <motion.section
      id="featured-articles"
      className="bg-primary flex flex-col py-16 lg:py-20 px-6 lg:px-16 xl:px-48 2xl:px-48 pt-16 md:py-16"
      initial="offscreen"
      whileInView="onscreen"
      transition={{ staggerChildren: 0.15 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="mb-16">
        <motion.h2
          className="text-3xl lg:text-[35px] font-semibold! w-fit text-black mb-3"
          variants={titleVariants}
        >
          {title}
        </motion.h2>
        <motion.p className="md:w-1/2 text-black" variants={titleVariants}>
          {subtitle}
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 overflow-scroll">
        <div className="lg:flex-1">
          <SinglePost post={posts[0]} locale={locale} />
        </div>
        <div className="lg:flex-1">
          <DigitalNomadingCarousel posts={posts.slice(1)} locale={locale} />
        </div>
      </div>
    </motion.section>
  );
};
