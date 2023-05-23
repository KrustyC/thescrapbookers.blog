import Image from "next/image";
import { useTranslations } from "next-intl";

import { AppLocale } from "@/types/global";

import homeHeroPic from "../../../../public/images/hero-wave.png";

import { HeroNavbar } from "./HeroNavbar";
import { Title } from "./Title";

interface HeroProps {
  locale: AppLocale;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const t = useTranslations("Home.Hero");

  return (
    <div className="relative w-full h-[720px] lg:h-[750px] 2xl:h-[940px] 4xl:h-[1800px] flex flex-col">
      <div className="flex z-50">
        <HeroNavbar locale={locale} />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Title
          titlePart1={t("title.part1")}
          titlePart2={t("title.part2")}
          subtitle={t("subtitle")}
          author={t("author")}
          locale={locale}
        />
      </div>

      <Image
        src={homeHeroPic}
        alt="A womand driving a scooter, with a man on the back. THey are out of focus. There is a sunset in the background."
        sizes="100vw"
        priority
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
