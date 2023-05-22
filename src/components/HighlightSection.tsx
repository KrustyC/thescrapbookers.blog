import Image from "next/image";
import Link from "next-intl/link";

import { leagueGothic } from "@/utils/fonts";

import homeHeroPic from "../../public/images/home-hero.jpg";

export const HighlightSection = () => {
  return (
    <div className="flex p-16 relative w-full h-[680px]">
      <div className="flex flex-col z-10 text-white">
        <h2
          style={leagueGothic.style}
          className="text-9xl font-regular uppercase w-3/5"
        >
          Vang Vieng to Luang Prabang
        </h2>
        <p className="py-6 text-xl font-light w-[380px]">
          The scary burning or smoky season had already made the air heavy and
          hazy in the nort
        </p>

        <Link
          href="/asia/laos/vang-vieng-to-luang-prabang"
          type="submit"
          className="font-light flex items-center justify-center rounded-2xl h-16 w-32 lg:w-56 bg-white text-black"
        >
          Read Article
        </Link>
      </div>

      <Image
        src={homeHeroPic}
        alt="Picture of Vange Vieng"
        placeholder="blur"
        sizes="100vw"
        priority={false}
        loading="lazy"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
