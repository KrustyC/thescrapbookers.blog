import { useTranslations } from "next-intl";

import { Country as ICountry, CountryCheatsheet } from "@/types/global";

import { CheatsheetBanner } from "./CheatsheetBanner";

interface CheatsheetProps {
  name: string;
  cheatsheet: CountryCheatsheet;
}

export const CheatsheetLoading = () => (
  <div className="w-full aspect-square lg:aspect-auto h-[560px] 2xl:w-max 2xl:mx-auto rounded-2xl shadow-xl loading-background-animation" />
);

export const Cheatsheet: React.FC<CheatsheetProps> = ({ name, cheatsheet }) => {
  const t = useTranslations("Country.Cheatsheet");

  return (
    <CheatsheetBanner
      countryName={name}
      cheatsheet={cheatsheet}
      copy={{
        title: t("title"),
        description: t("description"),
        seeMore: t("seeMore"),
      }}
    />
  );
};
