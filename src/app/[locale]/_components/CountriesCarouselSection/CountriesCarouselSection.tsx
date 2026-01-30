import { draftMode } from "next/headers";
import { getTranslations } from "next-intl/server";

import { getCountriesForContinent } from "@/graphql/queries/get-countries-for-continent.query";
import { AppLocale } from "@/types/global";

import thailandPic from "../../../../../public/images/chiang_mai_tower.webp";
import malaysiaPic from "../../../../../public/images/kuala_lumpur_mosque.webp";
import cambodiaPic from "../../../../../public/images/monk_walking_in_a_temple_near_angkor_wat.webp";
import nepalPic from "../../../../../public/images/nepalese_guy_on_swing.webp";
import laosPic from "../../../../../public/images/vientiane_man_working_with_cables.webp";
import vietnamPic from "../../../../../public/images/woman_pushing_a_bike_with_flowers_in_hanoi.webp";
import japanPic from "../../../../../public/images/japan_temple.webp";

import { CountriesCarouselSectionSkeleton } from "./CountriesCarouselSectionSkeleton";
import { NativeCarousel } from "./NativeCarousel";

interface Copy {
  thailand: string;
  laos: string;
  vietnam: string;
  cambodia: string;
  malaysia: string;
  nepal: string;
  japan: string;
}

function getImage(slug: string | undefined, copy: Copy) {
  switch (slug) {
    case "thailand":
      return {
        src: thailandPic,
        alt: copy.thailand,
        title: "Thailand",
      };
    case "laos":
      return {
        src: laosPic,
        alt: copy.laos,
        title: "Laos",
      };
    case "vietnam":
      return {
        src: vietnamPic,
        alt: copy.vietnam,
        title: "Vietnam",
      };
    case "cambodia":
      return {
        src: cambodiaPic,
        alt: copy.cambodia,
        title: "Cambodia",
      };
    case "malaysia":
      return {
        src: malaysiaPic,
        alt: copy.malaysia,
        title: "Malaysia",
      };
    case "nepal":
      return {
        src: nepalPic,
        alt: copy.nepal,
        title: "Nepal",
      };
    case "japan":
      return {
        src: japanPic,
        alt: copy.japan,
        title: "Japan",
      };
    default:
      return {
        src: cambodiaPic,
        alt: "",
        title: "",
      };


  }
}

interface CountriesCarouselSectionProps {
  locale: AppLocale;
}

export default async function CountriesCarouselSection({
  locale,
}: CountriesCarouselSectionProps) {
  const t = await getTranslations({
    locale,
    namespace: "Home.CountriesCarouselSection.Images",
  });

  const { isEnabled } = await draftMode();
  const { countries } = await getCountriesForContinent({
    continentSlug: "asia",
    locale,
    isPreview: isEnabled,
  });

  if (countries.length === 0) return null;

  const copy = {
    thailand: t("thailand"),
    laos: t("laos"),
    vietnam: t("vietnam"),
    cambodia: t("cambodia"),
    malaysia: t("malaysia"),
    nepal: t("nepal"),
    japan: t("japan"),
  };

  const slides = countries.map((country) => ({
    image: getImage(country.slug, copy),
    name: country.name,
    href: `/asia/${country.slug}`,
  }));

  return (
    <div className="mt-8 mb-16 lg:mt-14 lg:mb-0">
      <div className="min-h-[500px] lg:min-h-[550px]">
        <NativeCarousel slides={slides} />
      </div>
    </div>
  );
}

export { CountriesCarouselSectionSkeleton };
