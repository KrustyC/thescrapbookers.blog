import Image from "next/image";
import { Link } from "next-intl";

import logoPic from "../../public/images/logo-black.png";

export const Navbar: React.FC = () => {
  return (
    <div className="flex justify-center w-full h-32 bg-[#DB6843]">
      <div className="w-2/3 h-full flex items-center">
        <Link className="relative h-full w-56" href="/">
          <Image
            src={logoPic}
            alt="the scrapbooker logo"
            sizes="100%"
            fill
            style={{ objectFit: "contain" }}
          />
        </Link>
      </div>
    </div>
  );
};
