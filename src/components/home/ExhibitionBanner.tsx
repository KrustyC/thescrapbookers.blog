import { useTranslations } from "next-intl";

import { LocationPinIcon } from "@/icons/LocationPin";

export const ExhibitionBanner = () => {
  const t = useTranslations("Home.ExhibitionBanner");

  return (
    <div className="bg-black py-16 lg:py-24 px-8">
      <div className="w-full md:w-[72vw] lg:w-[60vw] xl:w-[800px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="font-league-gothic flex flex-col items-center text-white text-9xl lg:text-10xl">
          <span>07.12</span>
          <span>13.12</span>
        </div>
        <div className="text-white">
          <h2 className="text-4xl font-bold text-white mt-1">
            <span className="text-3xl lg:text-5xl">{t("title")}</span>
          </h2>
          <div className="flex items-center mt-2 mb-1">
            <LocationPinIcon className="w-4 h-4 mr-0.5" />
            <div>
              <p className="italic mt-1">{t("location")}</p>
            </div>
          </div>
          <p className="text-white">{t("description")}</p>
        </div>
      </div>
    </div>
  );
};
