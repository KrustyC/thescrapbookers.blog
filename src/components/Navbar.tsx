import classNames from "classnames";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

import { AppLocale } from "@/types/global";
import { URLS } from "@/utils/urls";

import logoPic from "../../public/images/logo_white.png";

import { LocaleSelector } from "./LocaleSelector/LocaleSelector";

interface NavbarProps {
  blackText?: boolean;
  locale: AppLocale;
}

export const Navbar: React.FC<NavbarProps> = ({
  blackText = false,
  locale,
}) => {
  const localeDropdown = useTranslations("Global.LocaleSelector");
  const navbar = useTranslations("Global.NavbarLinks");

  return (
    <div className="flex justify-between w-full h-24 bg-transparent absolute top-0 left-0 right-0 z-50 px-6 lg:px-24">
      <Link className="relative h-full w-44 md:w-56" href="/">
        <Image
          src={logoPic}
          alt="the scrapbooker logo"
          sizes="100%"
          fill
          style={{ objectFit: "contain" }}
        />
      </Link>

      <div
        className={classNames("h-full flex items-center gap-5 font-semibold", {
          "text-white": !blackText,
          "text-black": blackText,
        })}
      >
        <div className="hidden md:flex items-center gap-5 uppercase">
          <Link href={URLS.asiaArticles()}>{navbar("asia")}</Link>
          <Link href={URLS.aboutUs()}>{navbar("aboutUs")}</Link>
        </div>

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
