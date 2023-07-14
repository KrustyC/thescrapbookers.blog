import Image from "next/image";
import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/uikit/ButtonLink";
import { leagueGothic } from "@/utils/fonts";

import highlightPic from "../../../public/images/vang-vieng.jpg";

export const HighlightSection = () => {
  const t = useTranslations("Home.HighlightSection");

  return (
    <div className="flex py-16 px-8 lg:px-24 lg:mt-16 relative w-full h-[880px] 2xl:h-[780px]">
      <div className="flex flex-col justify-start md:justify-center z-10 text-white relative">
        <h2
          style={leagueGothic.style}
          className="text-8xl md:text-8xl xl:text-9xl font-regular uppercase w-full md:w-2/3 lg:w-3/5"
        >
          {t("title")}
        </h2>

        <p className="py-4 lg:py-6 text-lg lg:text-xl font-light w-full md:w-[380px] lg:w-[460px]">
          {t("text")}
        </p>

        <div className="absolute left-0 top-[200px] md:left-[300px] md:top-[350px] xl:left-[450px] xl:top-[350px] z-50 text-white flex flex-col self-end w-fit bg-black uppercase p-6 rounded-xl -rotate-12 text-2xl font-bold border-2 border-black">
          Coming soon!
        </div>
      </div>

      <Image
        src={highlightPic}
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
