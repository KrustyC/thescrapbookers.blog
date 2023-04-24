import Image from "next/image";
import { Link } from "next-intl";
import { LocaleSwitch } from "components/LocaleSwitch";

import logoPic from "../../public/images/logo-black.png";
import { AppLocale } from "types/global";

interface NavbarProps {
  locale: AppLocale;
}

export const Navbar: React.FC<NavbarProps> = ({ locale }) => {
  return (
    <div className="flex justify-center w-full h-32 bg-[#DB6843]">
      <div className="w-2/3 h-full flex items-center justify-between">
        <Link className="relative h-full w-56" href="/">
          <Image
            src={logoPic}
            alt="the scrapbooker logo"
            sizes="100%"
            fill
            style={{ objectFit: "contain" }}
          />
        </Link>

        <LocaleSwitch currentLocale={locale} />
      </div>
    </div>
  );
};
