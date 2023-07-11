import Image from "next/image";

import { Image as IImage } from "@/types/global";
import { leagueGothic } from "@/utils/fonts";

interface CountryHeroProps {
  name: string;
  image?: IImage;
}

export const CountryHeroLoading = () => (
  <div className="w-full h-[740px] lg:h-[650px] 2xl:h-[820px] 4xl:h-[1800px] bg-gray-300 animate-pulse" />
);

export const CountryHero: React.FC<CountryHeroProps> = ({ name, image }) => {
  return (
    <div className="relative w-full h-[740px] lg:h-[650px] 2xl:h-[820px] 4xl:h-[1800px] flex justify-center lg:justify-start items-center lg:px-48">
      <h1
        className="z-10 text-9xl text-white uppercase"
        style={leagueGothic.style}
      >
        {name}
      </h1>

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
