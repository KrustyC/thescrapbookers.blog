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
      <div className="flex gap-20 h-[550px]">
        <div className="h-full relative bg-[red] w-3/12 rounded-r-2xl">
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

        <div className="h-full relative bg-[green] w-4/12 rounded-2xl">
          <Image
            className="rounded-2xl"
            src={image2}
            alt="the scrapbooker logo" // @TODO Once images are there add description
            sizes="100%"
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="h-full relative bg-[blue] w-4/12 rounded-l-2xl">
          <Image
            className="rounded-l-2xl"
            src={image3}
            alt="the scrapbooker logo" // @TODO Once images are there add description
            sizes="100%"
            loading="lazy"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="absolute left-[250px] bottom-[80px] flex flex-col rounded-2xl p-8 bg-white drop-shadow-2xl">
        <h2 className="text-4xl font-semibold  w-fit border-primary border-b-8">
          {t("title")}
        </h2>

        <p className="text-xl my-4 w-[420px]">{t("text")}</p>

        <ButtonLink size="sm" href="black" target="_blank" variant="black">
          {t("cta")}
        </ButtonLink>
      </div>
    </div>
  );
};
