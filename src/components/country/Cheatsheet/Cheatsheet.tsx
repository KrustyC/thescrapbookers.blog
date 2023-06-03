import { useTranslations } from "next-intl";

import { Country as ICountry,CountryCheatsheet } from "@/types/global";

import { CheatsheetBanner } from "./CheatsheetBanner";

interface CheatsheetProps {
  name: string;
  cheatsheet: CountryCheatsheet;
}

export const CheatsheetLoading = () => (
  <div className="w-full 2xl:w-[1024px] 2xl:mx-auto flex flex-col md:flex-row gap-6">
    Loading
  </div>
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
