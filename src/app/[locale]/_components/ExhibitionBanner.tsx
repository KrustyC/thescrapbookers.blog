import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { CameraIcon } from "@/icons/Camera";
import { LocationPinIcon } from "@/icons/LocationPin";

const PALAZZO_PRETORIO_LINK = "https://maps.app.goo.gl/qPo61i3BWgHJZTGp6";

export const ExhibitionBanner = () => {
  const t = useTranslations("Home.ExhibitionBanner");

  return (
    <div className="bg-black py-16 lg:py-24 px-8">
      <div className="w-full md:w-[72vw] lg:w-[60vw] xl:w-[1024px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16">
        <div className="font-league-gothic flex flex-col items-start text-white leading-[160px] lg:leading-[200px] text-[180px] lg:text-[220px]">
          <span>07.12</span>
          <span>13.12</span>
        </div>

        <div className="text-white w-full flex flex-col flex-1">
          <h2 className="text-4xl font-bold text-white lg:mt-4">
            <span
              className="text-3xl lg:text-5xl"
              dangerouslySetInnerHTML={{ __html: t.raw("title") }}
            />
          </h2>

          <div className="flex flex-col lg:flex-row lg:items-end my-4 lg:mb-2 lg:mt-4">
            <div className="flex items-center mr-4">
              <CameraIcon className="stroke-white w-4 h-4 mr-1" />

              <b className="mb-0 mr-0">{t("exhibition")}</b>
            </div>
            <Link
              href={PALAZZO_PRETORIO_LINK}
              target="_blank"
              className="flex items-center mt-0.5 lg:mt-2 mb-0.5 underline hover:text-primary transition-all"
            >
              <LocationPinIcon className="w-4 h-4 mr-0.5" />
              <div>
                <span className="italic mt-1">{t("location")}</span>
              </div>
            </Link>
          </div>

          <p className="text-white lg:w-4/5">{t("description")}</p>

          <Link
            href="mailto:hello@thescrapbookers.blog?subject=Info Mostra Palazzo Pretorio"
            className="mt-6 lg:mt-8 flex justify-center items-center rounded-2xl h-16 text-xl w-full lg:w-fit bg-black text-white hover:bg-white hover:text-black transition-all border-2 border-white px-12"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </div>
  );
};
