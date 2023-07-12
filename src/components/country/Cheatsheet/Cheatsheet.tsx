import { useTranslations } from "next-intl";

import { Country } from "@/types/global";

import { CheatsheetBanner } from "./CheatsheetBanner";

interface CheatsheetProps {
  country: Required<Pick<Country, "name" | "slug" | "cheatsheet">>;
}

export const CheatsheetLoading = () => (
  <div className="w-full aspect-square lg:aspect-auto h-[560px] 2xl:w-max 2xl:mx-auto rounded-2xl shadow-xl loading-background-animation" />
);

export const Cheatsheet: React.FC<CheatsheetProps> = ({ country }) => {
  const t = useTranslations("Country.Cheatsheet");

  return (
    <CheatsheetBanner
      country={country}
      copy={{
        title: t("title"),
        description: t("description"),
        seeMore: t("seeMore"),
      }}
    />
  );
};
