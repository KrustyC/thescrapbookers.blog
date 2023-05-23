import Image from "next/image";
import Link from "next-intl/link";

import { leagueGothic } from "@/utils/fonts";

import homeHeroPic from "../../../public/images/home-hero.jpg";
import { ButtonLink } from "../uikit/ButtonLink";

export const HighlightSection = () => {
  return (
    <div className="flex py-16 px-24 relative w-full h-[680px] 2xl:h-[780px]"> 
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

        <ButtonLink
          href="/asia/laos/vang-vieng-to-luang-prabang"
          type="submit"
          variant="white"
        >
          Read Article
        </ButtonLink>
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
