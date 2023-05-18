import React, { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { InstagramIcon } from "icons/Instagram";
import { TwitterIcon } from "icons/Twitter";

import { LocaleSwitch } from "components/LocaleSwitch";
import { AppLocale } from "types/global";
import { URLS } from "utils/urls";

import homeHeroPic from "../../public/images/home-hero.jpg";
import logoPic from "../../public/images/logo-white.png";

interface NavbarProps {
  locale: AppLocale;
}

const Navbar: React.FC<NavbarProps> = ({ locale }) => {
  const t = useTranslations("Global.LocaleSwitch");

  return (
    <div className="h-24 xl:h-24 flex items-center justify-between mb-4 lg:mb-20 xl:mb-28">
      <Link
        className="relative w-44 md:w-56 lg:w-72 xl:w-56 h-full xl:h-20"
        href="/"
        target="_blank"
      >
        <Image
          src={logoPic}
          alt="the scrapbooker logo"
          sizes="100%"
          fill
          priority
          style={{ objectFit: "contain" }}
        />
      </Link>

      <LocaleSwitch currentLocale={locale} helpText={t("helpText")} />
    </div>
  );
};

interface CircularButtonLinkProps {
  href: string;
  className?: string;
}

const CircularLink: React.FC<PropsWithChildren<CircularButtonLinkProps>> = ({
  href,
  className = "",
  children,
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center rounded-full bg-white h-10 w-10 ${className}`}
    >
      {children}
    </Link>
  );
};

interface HeroProps {
  locale: AppLocale;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const t = useTranslations("Home.Hero");

  return (
    <div className="w-full pb-20 lg:pb-40 relative bg-black text-white flex justify-center">
      <div className="flex flex-col px-6 lg:px-16 xl:px-48 z-10">
        <Navbar locale={locale} />
        <h1 className="text-5xl lg:text-7xl leading-[3.5rem] lg:leading-[5.5rem] font-bold w-full lg:w-3/4">
          {t("title")}
        </h1>
        <div className="flex mt-4">
          <CircularLink href={URLS.twitterURL()} className="mr-3">
            <TwitterIcon className="text-black fill-black h-5" />
          </CircularLink>

          <CircularLink href={URLS.instagramURL()}>
            <InstagramIcon className="text-black fill-black h-5" />
          </CircularLink>
        </div>
      </div>
      <Image
        src={homeHeroPic}
        alt="Picture of the author"
        placeholder="blur"
        sizes="100vw"
        priority
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
