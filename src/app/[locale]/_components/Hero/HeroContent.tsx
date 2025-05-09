"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";

import { AppLocale } from "@/types/global";
import { smoothSpring } from "@/utils/transitions";

import homeHeroPic from "../../../../../public/images/nepal_hero.webp";

import { Arrow } from "./Arrow";
import { HeroNavbar } from "./HeroNavbar";

interface HeroProps {
  heroCopy: { title: string; heroImgAlt: string };
  localeDropdownCopy: { optionEnglish: string; optionItalian: string };
  navbarCopy: { asia: string; aboutUs: string; allArticles: string };
  locale: AppLocale;
}

const titleVariants: Variants = {
  offscreen: { y: 80, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: smoothSpring },
};

const containerVariants: Variants = {
  hidden: { y: 200, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: smoothSpring },
};

export const HeroContent: React.FC<HeroProps> = ({
  heroCopy,
  localeDropdownCopy,
  navbarCopy,
  locale,
}) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div
        className="flex flex-col rounded-full relative w-full h-[740px] lg:h-[680px] 2xl:h-[740px] 4xl:h-[1800px]"
        initial="offscreen"
        whileInView="onscreen"
        transition={{ staggerChildren: 0.35 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <HeroNavbar
          localeDropdownCopy={localeDropdownCopy}
          navbarCopy={navbarCopy}
          locale={locale}
        />

        <div className="z-10 pb-20 md:py-12 lg:py-32 h-full w-full flex items-end px-6 lg:px-16 xl:px-40">
          <motion.h1
            className="text-white lg:text-white/80 text-[75px] md:text-[80px] lg:text-8xl leading-[4.5rem] lg:leading-[5.5rem] font-medium uppercase font-league-gothic lg:w-[700px]"
            variants={titleVariants}
          >
            {heroCopy.title}
          </motion.h1>
        </div>

        <Image
          src={homeHeroPic}
          alt={heroCopy.heroImgAlt}
          title="Langtang Valley"
          fill
          priority
          className="md:rounded-2xl"
          objectFit="cover"
        />

        <Arrow />
      </motion.div>
    </motion.div>
  );
};
