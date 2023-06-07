import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

import { ButtonLink } from "@/components/uikit/ButtonLink";
import { leagueGothic } from "@/utils/fonts";

import chiangMaiTower from "../../../public/images/chiang-mai-tower.jpg";
import vientianeBuddhaStatue from "../../../public/images/vientiane-buddha-statue.jpg";
import vientianeManWorkingWithCables from "../../../public/images/vientiane-man-working-with-cables.jpg";
import vientianeTemple from "../../../public/images/vientiane-temple.jpg";

export const PhotoDumpSection: React.FC = () => {
  const t = useTranslations("Home.PhotoDump");

  return (
    <div className="mb-16 mt-32">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-8 lg:h-[550px]">
        <Link
          href="/asia/laos"
          className="h-[180px] md:h-[320px] lg:h-full w-3/5 lg:w-1/4 rounded-r-2xl bg-gray-200 relative"
        >
          <Image
            className="rounded-r-2xl"
            src={vientianeManWorkingWithCables}
            alt="a man on a step ladder working with a lot of cable in Vientiane (Laos)"
            sizes="100%"
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
          />

          <div className="absolute z-10 top-0 left-0 bottom-0 right-0 h-full w-full flex items-center justify-center">
            <span
              className="text-7xl text-white uppercase"
              style={leagueGothic.style}
            >
              Laos
            </span>
          </div>
        </Link>

        <div className="h-[140px] md:h-[320px] lg:h-full w-5/6 md:w-3/5 lg:w-1/4 rounded-l-2xl lg:rounded-2xl relative bg-gray-200 self-end lg:self-auto">
          <Image
            className="rounded-l-2xl lg:rounded-2xl"
            src={vientianeTemple}
            alt="the ceiling of a temple in Vienitane (Laos)"
            sizes="100%"
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="h-[180px] md:h-[320px] lg:h-full w-3/5 lg:w-1/4 rounded-2xl relative bg-gray-200">
          <Image
            className="rounded-2xl"
            src={vientianeBuddhaStatue}
            alt="a statue of Buddha in Vientiane (Laos)"
            sizes="100%"
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="h-[180px] md:h-[360px] lg:h-full w-3/4 md:w-1/2 lg:w-1/4 rounded-r-2xl lg:rounded-r-none lg:rounded-l-2xl relative bg-gray-200">
          <Image
            className="rounded-r-2xl lg:rounded-r-none lg:rounded-l-2xl"
            src={chiangMaiTower}
            alt="an old tower from a temple in Chiang Mai (Thailand)"
            sizes="100%"
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* <div className="absolute left-[20px] md:left-[120px] bottom-[340px] lg:left-[250px] lg:bottom-[80px] flex flex-col rounded-2xl p-6 lg:p-8 bg-white drop-shadow-2xl">
        <h2 className="text-xl lg:text-4xl font-semibold  w-fit border-primary border-b-2 lg:border-b-[6px]">
          {t("title")}
        </h2>

        <p className="text-regular lg:text-xl my-4 w-[280px] md:w-[380px] lg:w-[420px]">
          {t("text")}
        </p>

        <ButtonLink size="sm" href="black" target="_blank" variant="black">
          {t("cta")}
        </ButtonLink>
      </div> */}
    </div>
  );
};
