import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { LocaleSelector } from "@/components/LocaleSelector/LocaleSelector";
import { AppLocale } from "@/types/global";
import { URLS } from "@/utils/urls";

import logoPic from "../../../../public/images/logo-white.png";

interface HeroNavbarProps {
  locale: AppLocale;
}

export const HeroNavbar: React.FC<HeroNavbarProps> = ({ locale }) => {
  const localeDropdown = useTranslations("Global.LocaleSelector");
  const navbar = useTranslations("Home.NavbarLinks");

  return (
    <div className="w-full h-24 flex items-center md:justify-between px-6 lg:px-24">
      <Link
        className="relative w-44 lg:w-72 xl:w-56 h-full xl:h-20"
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

      <div className="hidden md:flex items-center gap-5 text-white uppercase font-semibold">
        <Link href={URLS.asiaArticles()}>{navbar("asia")}</Link>
        <Link href={URLS.aboutUs()}>{navbar("aboutUs")}</Link>

        <LocaleSelector
          currentLocale={locale}
          copy={{
            optionEnglish: localeDropdown("optionEnglish"),
            optionItalian: localeDropdown("optionItalian"),
          }}
        />
      </div>
    </div>
  );
};
