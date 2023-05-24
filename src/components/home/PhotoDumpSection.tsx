import Image from "next/image";
import { useTranslations } from "next-intl";

import image1 from "../../../public/images/about-us.jpg";
import image2 from "../../../public/images/home-hero.jpg";
import image3 from "../../../public/images/the_scrapbookers.png";
import { ButtonLink } from "../uikit/ButtonLink";

export const PhotoDumpSection: React.FC = () => {
  const t = useTranslations("Home.PhotoDump");

  return (
    <div className="relative my-20">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-20 lg:h-[550px]">
        <div className="h-[180px] md:h-[320px] lg:h-full w-3/5 lg:w-3/12 rounded-r-2xl relative bg-gray-200">
          <Image
            className="rounded-r-2xl"
            src={image1}
            alt="the scrapbooker logo" // @TODO Once images are there add description
            sizes="100%"
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="h-[140px] md:h-[320px] lg:h-full w-5/6 md:w-3/5 lg:w-4/12 rounded-l-2xl lg:rounded-2xl relative bg-gray-200 self-end lg:self-auto">
          <Image
            className="rounded-l-2xl lg:rounded-2xl"
            src={image2}
            alt="the scrapbooker logo" // @TODO Once images are there add description
            sizes="100%"
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="h-[180px] md:h-[360px] lg:h-full w-3/4 md:w-1/2 lg:w-3/12 rounded-r-2xl lg:rounded-r-none lg:rounded-l-2xl relative bg-gray-200">
          <Image
            className="rounded-r-2xl lg:rounded-r-none lg:rounded-l-2xl"
            src={image3}
            alt="the scrapbooker logo" // @TODO Once images are there add description
            sizes="100%"
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="absolute left-[20px] md:left-[120px] bottom-[340px] lg:left-[250px] lg:bottom-[80px] flex flex-col rounded-2xl p-6 lg:p-8 bg-white drop-shadow-2xl">
        <h2 className="text-xl lg:text-4xl font-semibold  w-fit border-primary border-b-2 lg:border-b-8">
          {t("title")}
        </h2>

        <p className="text-regular lg:text-xl my-4 w-[280px] md:w-[380px] lg:w-[420px]">{t("text")}</p>

        <ButtonLink size="sm" href="black" target="_blank" variant="black">
          {t("cta")}
        </ButtonLink>
      </div>
    </div>
  );
};
