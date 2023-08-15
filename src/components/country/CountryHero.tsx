import Image from "next/image";

import { Image as IImage } from "@/types/global";

interface CountryHeroProps {
  name: string;
  description?: string;
  image?: IImage;
}

export const CountryHeroLoading = () => (
  <div className="country-continent-hero bg-gray-300 animate-pulse" />
);

export const CountryHero: React.FC<CountryHeroProps> = ({
  name,
  description,
  image,
}) => {
  return (
    <div className="relative country-continent-hero flex justify-center lg:justify-start items-center px-6 lg:px-48 bg-gray-400">
      <div className="flex flex-col z-10 text-white">
        <h1 className="text-8xl lg:text-9xl uppercase font-league-gothic">
          {name}
        </h1>

        <p className="text-xl ml-2 lg:w-3/5">{description}</p>
      </div>

      {image && (
        <Image
          src={image.url || ""}
          alt={image.description || ""}
          sizes="100vw"
          priority
          fill
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
  );
};
