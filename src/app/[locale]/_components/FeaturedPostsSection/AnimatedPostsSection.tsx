"use client";

import { motion, Variants } from "framer-motion";

import { PostCard } from "@/components/PostCard/PostCard";
import { PostcardRail } from "@/components/PostCard/PostcardRail";
import { AppLocale, ShortPost } from "@/types/global";
import { smoothSpring } from "@/utils/transitions";

interface AnimatedPostsSectionProps {
  title: string;
  posts: ShortPost[];
  locale: AppLocale;
}

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

export const AnimatedPostsSection: React.FC<AnimatedPostsSectionProps> = ({
  title,
  posts,
  locale,
}) => {
  return (
    <motion.section
      id="featured-articles"
      className="section-layout"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2 className="text-black" variants={titleVariants}>
        {title}
      </motion.h2>

      <PostcardRail>
        {posts.map((post, i) => (
          <PostCard key={i} post={post} locale={locale} />
        ))}
      </PostcardRail>
    </motion.section>
  );
};
