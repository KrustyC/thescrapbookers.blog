import Image from "next/image";
import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/uikit/ButtonLink";
import { ShortCountry } from "@/types/global";

interface CountryProps {
  country: ShortCountry;
  continentSlug: string;
}

export const CountryLoading = () => (
  <div className="w-full 2xl:w-max 2xl:mx-auto flex flex-col md:flex-row gap-6">
    <div className="w-full aspect-square md:w-3/4 md:aspect-auto md:h-[300px] rounded-xl bg-gray-300 animate-pulse" />

    <div className="w-full md:w-1/4 flex flex-col gap-2 md:gap-4">
      <h2 className="h-12 bg-gray-300 animate-pulse" />
      <div className="flex flex-col gap-2">
        <div className="h-8 w-full bg-gray-300 animate-pulse" />
        <div className="h-8 w-3/4 bg-gray-300 animate-pulse" />
        <div className="h-8 w-3/5 bg-gray-300 animate-pulse" />
      </div>
      <div className="h-10 lg:h-12 min-w-16 lg:min-w-24 px-4 lg:px-8 rounded-xl bg-gray-300 animate-pulse" />
    </div>
  </div>
);

export const Country: React.FC<CountryProps> = ({ country, continentSlug }) => {
  const t = useTranslations("Continent.Country");

  return (
    <div className="w-full 2xl:w-max 2xl:mx-auto flex flex-col md:flex-row gap-6">
      <div className="w-full aspect-square md:w-3/4 md:aspect-auto md:h-[300px] relative rounded-xl loading-background">
        <Image
          className="rounded-xl"
          src={country.thumbnailImage?.url || ""}
          alt={country.thumbnailImage?.description || "missing image"}
          title={country.thumbnailImage?.title || "missing image"}
          priority
          fill
          objectFit="cover"
        />
      </div>

      <div className="w-full md:w-1/4 flex flex-col gap-3 md:gap-4">
        <h2 className="text-2xl font-bold">{country.name}</h2>
        <p className="mb-0.5 line-clamp-6"> {country.description}</p>
        <ButtonLink
          size="sm"
          variant="black"
          href={`/${continentSlug}/${country.slug}`}
        >
          {t("cta")}
        </ButtonLink>
      </div>
    </div>
  );
};
