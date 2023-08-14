import Image from "next/image";
import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/uikit/ButtonLink";
import { leagueGothic } from "@/utils/fonts";

import highlightPic from "../../../public/images/vang-vieng.jpg";

export const HighlightSection = () => {
  const t = useTranslations("Home.HighlightSection");

  return (
    <div className="flex py-16 px-2 lg:px-24 lg:mt-16 relative w-full h-[880px] 2xl:h-[780px]">
      <div className="w-full md:w-[72vw] lg:w-[60vw] xl:w-[800px] flex flex-col justify-start md:justify-center z-10 text-white relative p-8 bg-black/50 h-fit rounded-xl">
        <h2
          className={`text-6xl md:text-8xl xl:text-9xl font-regular uppercase ${leagueGothic.className}`}
        >
          {t("title")}
        </h2>

        <p className="py-4 lg:py-6 text-lg font-light w-full md:w-[70%] lg:w-[460px]">
          {t("text")}
        </p>

        {/* <div className="absolute -bottom-[50px] right-0 md:bottom-auto md:right-none md:left-[350px] md:top-[200px] xl:left-[500px] z-50 text-white flex flex-col self-end w-fit bg-black uppercase p-6 rounded-xl -rotate-12 text-2xl font-bold border-2 border-black"> */}
        <div className="absolute -bottom-[50px] lg:-bottom-[20px] right-0 md:right-none md:-right-[50px] z-50 text-white flex flex-col self-end w-fit bg-black uppercase p-6 rounded-xl -rotate-12 text-2xl font-bold border-2 border-black">
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
