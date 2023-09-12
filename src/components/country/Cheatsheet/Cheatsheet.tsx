import { useLocale, useTranslations } from "next-intl";

import { Country } from "@/types/global";

import {
  CheatsheetBanner,
  type CheatsheetBannerInfos,
} from "./CheatsheetBanner";

interface CheatsheetProps {
  country: Required<Pick<Country, "name" | "slug" | "cheatsheet">>;
}

export const CheatsheetLoading = () => (
  <div className="w-full aspect-square lg:aspect-auto h-[560px] 2xl:w-max 2xl:mx-auto rounded-2xl shadow-xl loading-background-animation" />
);

export const Cheatsheet: React.FC<CheatsheetProps> = ({ country }) => {
  const t = useTranslations("Country.Cheatsheet");
  const locale = useLocale();

  const { cheatsheet } = country;

  const info: CheatsheetBannerInfos = {
    capital: {
      heading: t("Headings.capital"),
      value: cheatsheet.capital,
    },
    population: {
      heading: t("Headings.population"),
      value: new Intl.NumberFormat(locale).format(cheatsheet.population),
    },
    lifeExpectancy: {
      heading: t("Headings.lifeExpectancy"),
      value: t("Values.lifeExpectancy", {
        years: new Intl.NumberFormat(locale).format(cheatsheet.lifeExpectancy),
      }),
    },
    languages: {
      heading: t("Headings.languages"),
      value: cheatsheet.languages,
    },
    currencies: {
      heading: t("Headings.currencies"),
      value: cheatsheet.currencies,
    },
    eVisa: {
      heading: t("Headings.eVisa"),
      value: cheatsheet.visaWebsite,
    },
    dishes: {
      heading: t("Headings.dishes"),
      value: cheatsheet.dishes,
    },
    phrases: {
      heading: t("Headings.phrases"),
      value: cheatsheet.commonPhrases,
    },
    coworkingSpaces: {
      heading: t("Headings.coworkingSpaces"),
      value: cheatsheet.coworkingSpaces,
    },
  };

  return (
    <CheatsheetBanner
      country={country}
      copy={{
        title: t("title"),
        description: t("description"),
        seeMore: t("seeMore"),
        seeLess: t("seeLess"),
        info,
      }}
    />
  );
};
