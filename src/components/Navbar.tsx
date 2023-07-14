import classNames from "classnames";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

import { LocaleSwitch } from "@/components/LocaleSwitch";
import { AppLocale } from "@/types/global";
import { URLS } from "@/utils/urls";

import logoPic from "../../public/images/logo-white.png";

interface NavbarProps {
  blackText?: boolean;
  locale: AppLocale;
}

export const Navbar: React.FC<NavbarProps> = ({
  blackText = false,
  locale,
}) => {
  const localeSwitch = useTranslations("Global.LocaleSwitch");
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
        className={classNames(
          "hidden md:flex items-center gap-5 uppercase font-semibold",
          {
            "text-white": !blackText,
            "text-black": blackText,
          }
        )}
      >
        <Link href={URLS.asiaArticles()}>{navbar("asia")}</Link>
        <Link href={URLS.aboutUs()}>{navbar("aboutUs")}</Link>

        {/* <LocaleSwitch
          currentLocale={locale}
          helpText={localeSwitch("helpText")}
        /> */}
      </div>
    </div>
  );
};
