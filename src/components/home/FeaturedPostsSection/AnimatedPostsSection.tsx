"use client";

import { motion } from "framer-motion";

import { PostCard } from "@/components/PostCard/PostCard";
import { PostcardRail } from "@/components/PostCard/PostcardRail";
import { AppLocale, ShortPost } from "@/types/global";

interface AnimatedPostsSectionProps {
  title: string;
  posts: ShortPost[];
  locale: AppLocale;
}

export const AnimatedPostsSection: React.FC<AnimatedPostsSectionProps> = ({
  title,
  posts,
  locale,
}) => {
  return (
    <motion.section
      className="section-layout"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.3 }}
    >
      <motion.h2
        className="text-black"
        variants={{
          offscreen: {
            x: -40,
            opacity: 0,
          },
          onscreen: {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              duration: 1.5,
            },
          },
        }}
      >
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
