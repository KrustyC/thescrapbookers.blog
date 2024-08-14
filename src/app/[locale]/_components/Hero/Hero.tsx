import Image from "next/image";
import { useTranslations } from "next-intl";

import { AppLocale } from "@/types/global";

import homeHeroPic from "../../../../../public/images/nepal_hero.webp";

import { HeroNavbar } from "./HeroNavbar";
import { Title } from "./Title";

interface HeroProps {
  locale: AppLocale;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const t = useTranslations("Home.Hero");

  return (
    <div className="relative w-full h-[740px] lg:h-[680px] 2xl:h-[740px] 4xl:h-[1800px] flex flex-col">
      <div className="flex z-50">
        <HeroNavbar locale={locale} />
      </div>

      <Title title={t("title")} />

      <Image
        src={homeHeroPic}
        alt={t("heroImgAlt")}
        title="Langtang Valley"
        sizes="100vw"
        priority
        className=""
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
