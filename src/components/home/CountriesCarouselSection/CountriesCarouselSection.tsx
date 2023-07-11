import dynamic from "next/dynamic";

import { getCountriesForContinent } from "@/graphql/queries/get-countries-for-continent.query";
import { AppLocale } from "@/types/global";

import chiangMaiTower from "../../../../public/images/chiang-mai-tower.jpg";
import vientianeBuddhaStatue from "../../../../public/images/vientiane-buddha-statue.jpg";
import vientianeManWorkingWithCables from "../../../../public/images/vientiane-man-working-with-cables.jpg";
import vientianeTemple from "../../../../public/images/vientiane-temple.jpg";

import { CountriesCarouselSectionSkeleton } from "./CountriesCarouselSectionSkeleton";

const CountryCarousel = dynamic(() => import("./Carousel"), { ssr: false });

function getImage(slug: string | undefined) {
  switch (slug) {
    case "thailand":
      return chiangMaiTower;
    case "laos":
      return vientianeManWorkingWithCables;
    case "vietnam":
      return vientianeBuddhaStatue;
    case "cambodia":
      return vientianeTemple;
    default:
      return vientianeBuddhaStatue;
  }
}

export default async function CountriesCarouselSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const { countries } = await getCountriesForContinent({
    continentSlug: "asia",
    locale,
    isPreview: false,
  });

  if (countries.length === 0) return null;

  const slides = countries.map((country) => ({
    image: getImage(country.slug),
    name: country.name,
    href: `/asia/${country.slug}`,
  }));

  return (
    <div className="my-16 lg:mt-20 lg:mb-0">
      <div className="min-h-[500px] lg:min-h-[550px]">
        <CountryCarousel slides={slides} />
      </div>
    </div>
  );
}

export { CountriesCarouselSectionSkeleton };
