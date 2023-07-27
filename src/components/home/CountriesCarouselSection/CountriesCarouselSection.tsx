import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getCountriesForContinent } from "@/graphql/queries/get-countries-for-continent.query";
import { AppLocale } from "@/types/global";

import chiangMaiTower from "../../../../public/images/chiang-mai-tower.jpg";
import vientianeBuddhaStatue from "../../../../public/images/vientiane-buddha-statue.jpg";
import vientianeManWorkingWithCables from "../../../../public/images/vientiane-man-working-with-cables.jpg";
import vientianeTemple from "../../../../public/images/vientiane-temple.jpg";

import { CountriesCarouselSectionSkeleton } from "./CountriesCarouselSectionSkeleton";

const CountryCarousel = dynamic(() => import("./Carousel"), { ssr: false });

// @TODO Decide the final images and the fix alt description
function getImage(slug: string | undefined) {
  switch (slug) {
    case "thailand":
      return {
        src: chiangMaiTower,
        alt: "a tower in Chiang Mai (Thailand)",
      };
    case "laos":
      return {
        src: vientianeManWorkingWithCables,
        alt: "a man on a step ladder working with a lot of cable in Vientiane (Laos)",
      };
    case "vietnam":
      return {
        src: vientianeBuddhaStatue,
        alt: "a Buddha statue in Vientiane (Laos)",
      }
    case "cambodia":
      return {
        src: vientianeTemple,
        alt: "a temple in Vientiane (Laos)",
      }
    default:
      return {
        src: vientianeBuddhaStatue,
        alt: "a Buddha statue in Vientiane (Laos)",
      }
  }
}

export default async function CountriesCarouselSection({
  locale,
}: {
  locale: AppLocale;
}) {
  const { isEnabled } = draftMode();
  const { countries } = await getCountriesForContinent({
    continentSlug: "asia",
    locale,
    isPreview: isEnabled,
  });

  if (countries.length === 0) return null;

  const slides = countries.map((country) => ({
    image: getImage(country.slug),
    name: country.name,
    href: `/asia/${country.slug}`,
  }));

  return (
    <div className="mt-8 mb-16 lg:mt-14 lg:mb-0">
      <div className="min-h-[500px] lg:min-h-[550px]">
        <CountryCarousel slides={slides} />
      </div>
    </div>
  );
}

export { CountriesCarouselSectionSkeleton };
