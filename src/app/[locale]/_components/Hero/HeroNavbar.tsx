"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";

import { LocaleSelector } from "@/components/LocaleSelector/LocaleSelector";
import { Link } from "@/i18n/navigation";
import { AppLocale } from "@/types/global";
import { smoothSpring } from "@/utils/transitions";
import { URLS } from "@/utils/urls";

import logoPic from "../../../../../public/images/logo_white.png";

interface HeroNavbarProps {
  localeDropdownCopy: {
    optionEnglish: string;
    optionItalian: string;
  };
  navbarCopy: {
    asia: string;
    aboutUs: string;
    allArticles: string;
  };
  locale: AppLocale;
}

const logoVariants: Variants = {
  offscreen: {
    x: -80,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: smoothSpring,
  },
};

const linkVariants: Variants = {
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

export const HeroNavbar: React.FC<HeroNavbarProps> = ({
  localeDropdownCopy,
  navbarCopy,
  locale,
}) => {
  return (
    <div className="z-50 w-full flex items-center justify-between md:px-6 lg:px-12 py-6">
      <motion.div
        className="relative w-44 lg:w-72 xl:w-56 h-8 xl:h-20"
        variants={logoVariants}
      >
        <Link href="/" target="_blank">
          <Image
            src={logoPic}
            alt="the scrapbooker logo"
            title="logo"
            sizes="100%"
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>
      </motion.div>

      <div className="flex items-center gap-5 text-white font-semibold pr-4 md:pr-0">
        <div className="hidden md:flex gap-5 items-center uppercase">
          <motion.div variants={linkVariants}>
            <Link href={URLS.asiaArticles()}>{navbarCopy.asia}</Link>
          </motion.div>

          <motion.div variants={linkVariants}>
            <Link href={URLS.allArticles()}>{navbarCopy.allArticles}</Link>
          </motion.div>

          <motion.div variants={linkVariants}>
            <Link href={URLS.aboutUs()}>{navbarCopy.aboutUs}</Link>
          </motion.div>
        </div>

        <motion.div variants={linkVariants}>
          <LocaleSelector currentLocale={locale} copy={localeDropdownCopy} />
        </motion.div>
      </div>
    </div>
  );
};
