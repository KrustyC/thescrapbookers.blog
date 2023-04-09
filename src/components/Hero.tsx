import { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { TwitterIcon } from "icons/Twitter";
import { InstagramIcon } from "icons/Instagram";

import homeHeroPic from "../../public/images/home-hero.jpg";
import logoPic from "../../public/images/logo-white.png";

const Navbar = () => {
  return (
    <div className="h-40 xl:h-24 flex items-center mb-4 lg:mb-20 xl:mb-28">
      <Link className="relative w-full lg:w-72 xl:w-56 h-32 xl:h-20" href="/" target="_blank">
        <Image
          src={logoPic}
          alt="the scrapbooker logo"
          sizes="100%"
          fill
          style={{ objectFit: "contain" }}
        />
      </Link>
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

export const Hero = () => {
  return (
    <div className="w-full pb-20 lg:pb-40 relative bg-black text-white flex justify-center">
      <div className="flex flex-col w-5/6 xl:w-7/12 z-10">
        <Navbar />
        <h1 className="text-5xl lg:text-7xl leading-[3.5rem] lg:leading-[5.5rem] font-bold w-full lg:w-3/4">
          Our {"'"}old school{"'"} way of keeping you up to date on our
          whereabouts
        </h1>
        <div className="flex mt-4">
          <CircularLink href="https://twitter.com/webflow" className="mr-3">
            <TwitterIcon className="text-black fill-black h-5" />
          </CircularLink>

          <CircularLink href="https://www.instagram.com/the_scrapbookers?igshid=OTjhZDVkZWE=">
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
