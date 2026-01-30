import Image from "next/image";

import { Image as IImage } from "@/types/global";

interface ContinentHeroProps {
  name?: string;
  image?: IImage;
}

export const ContinentHeroLoading = () => (
  <div className="country-continent-hero bg-gray-300 animate-pulse" />
);

export const ContinentHero: React.FC<ContinentHeroProps> = ({
  name,
  image,
}) => {
  return (
    <div className="relative country-continent-hero flex justify-start lg:justify-start items-end px-2 lg:px-48 bg-gray-300">
      <h1 className="text-8xl lg:text-10xl uppercase font-league-gothic z-10 text-white -mb-[13px]">
        {name}
      </h1>
      {image && (
        <Image
          src={image.url || ""}
          alt={image.description || "missing image"}
          title={image.title || "missing image"}
          priority
          fill
          style={{
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
};
