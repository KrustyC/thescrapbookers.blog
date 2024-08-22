import Image from "next/image";
import { useTranslations } from "next-intl";

import { AppLocale } from "@/types/global";

import homeHeroPic from "../../../../../public/images/nepal_hero.webp";

import { Arrow } from "./Arrow";
import { HeroNavbar } from "./HeroNavbar";

interface HeroProps {
  locale: AppLocale;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const t = useTranslations("Home.Hero");

  return (
    <div className="md:p-8">
      <div className="flex flex-col rounded-full relative w-full h-[740px] lg:h-[680px] 2xl:h-[740px] 4xl:h-[1800px]">
        <HeroNavbar locale={locale} />

        <div className="z-10 pb-20 md:py-12 lg:py-32 h-full w-full flex items-end px-6 lg:px-16 xl:px-40">
          <h1 className="text-white lg:text-white/80 text-[75px] md:text-[80px] lg:text-8xl leading-[4.5rem] lg:leading-[5.5rem] font-medium uppercase font-league-gothic lg:w-[700px]">
            {t("title")}
          </h1>
        </div>

        <Image
          src={homeHeroPic}
          alt={t("heroImgAlt")}
          title="Langtang Valley"
          sizes="100vw"
          priority
          className="md:rounded-2xl"
          fill
          style={{ objectFit: "cover" }}
        />

        <Arrow />
      </div>
    </div>
  );
};
