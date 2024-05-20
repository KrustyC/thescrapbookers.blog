"use client";

import { TypewriterText } from "@/components/TypewriterText";
import { delay, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TitleProps {
  titlePart1: string;
  titlePart2: string;
  author: string;
  subtitle: string;
}

const subtitleVariants = {
  offscreen: {
    opacity: 0,
    y: 20,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 3,
      duration: 0.2,
      bounce: 0.3,
      type: "tween",
    },
  },
};

export const Title: React.FC<TitleProps> = ({
  titlePart1,
  titlePart2,
  author,
  subtitle,
}) => {
  const [showIntro, setShowIntro] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setShowIntro(true);
    }, 1500);

    const timeout2 = setTimeout(() => {
      setShowAuthor(true);
    }, 3000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <div className="-mt-24 lg:-mt-48 flex flex-col justify-start px-6 lg:px-16 xl:px-24 z-10 text-white/80">
      <motion.h1
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.05 }}
        className="text-7xl lg:text-9xl xl:text-10xl leading-[4.5rem] lg:leading-[5.5rem] font-semibold w-full uppercase font-league-gothic"
        aria-hidden
      >
        <TypewriterText text={titlePart1} />
        <br />
        <TypewriterText text={titlePart2} />
      </motion.h1>

      <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-0">
        {showIntro && (
          <motion.p
            variants={subtitleVariants}
            className="lg:max-w-[600px] text-xl md:text-2xl lg:text-3xl lg:!font-light font-poppins"
          >
            {subtitle}
          </motion.p>
        )}
        {showAuthor && (
          <motion.span
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.13 }}
            className="uppercase text-4xl lg:text-7xl font-league-gothic"
          >
            <TypewriterText text={author} />
          </motion.span>
        )}
      </div>
    </div>
  );
};
