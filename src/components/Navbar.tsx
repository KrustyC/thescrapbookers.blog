import classNames from "classnames";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { AppLocale } from "@/types/global";
import { URLS } from "@/utils/urls";

import logoBlackPic from "../../public/images/logo_black.png";
import logoWhitePic from "../../public/images/logo_white.png";

import { LocaleSelector } from "./LocaleSelector/LocaleSelector";

interface NavbarProps {
  blackText?: boolean;
  blackLogo?: boolean;
  locale: AppLocale;
}

export const Navbar: React.FC<NavbarProps> = ({
  blackText = false,
  blackLogo = false,
  locale,
}) => {
  const localeDropdown = useTranslations("Global.LocaleSelector");
  const navbar = useTranslations("Global.NavbarLinks");

  return (
    <nav className="flex justify-between w-full h-24 bg-transparent absolute top-0 left-0 right-0 z-50 px-6 lg:px-24">
      <Link className="relative h-full w-44 md:w-56" href="/" prefetch={false}>
        <Image
          src={blackLogo ? logoBlackPic : logoWhitePic}
          alt="the scrapbooker logo"
          title="logo"
          fill
          unoptimized
          style={{
            objectFit: "contain",
          }}
        />
      </Link>
      <div
        className={classNames("h-full flex items-center gap-5 font-semibold", {
          "text-white": !blackText,
          "text-black": blackText,
        })}
      >
        <div className="hidden md:flex items-center gap-5 uppercase">
          <Link href={URLS.asiaArticles()} prefetch={false}>
            {navbar("asia")}
          </Link>
          <Link href={URLS.allArticles()} prefetch={false}>
            {navbar("allArticles")}
          </Link>
          <Link href={URLS.aboutUs()} prefetch={false}>
            {navbar("aboutUs")}
          </Link>
        </div>

        <LocaleSelector
          currentLocale={locale}
          copy={{
            optionEnglish: localeDropdown("optionEnglish"),
            optionItalian: localeDropdown("optionItalian"),
          }}
        />
      </div>
    </nav>
  );
};
