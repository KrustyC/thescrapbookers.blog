import Image from "next/image";

import { Image as IImage } from "@/types/global";
import { leagueGothic } from "@/utils/fonts";

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
    <div className="relative country-continent-hero flex justify-center lg:justify-start items-center lg:px-48">
      <h1
        className="z-10 text-9xl text-white uppercase"
        style={leagueGothic.style}
      >
        {name}
      </h1>

      {image && (
        <Image
          src={image.url || ""}
          alt={image.description || "missing image"}
          sizes="100vw"
          priority
          fill
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
  );
};
