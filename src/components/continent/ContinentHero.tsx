import Image from "next/image";

import { Image as IImage } from "@/types/global";

interface ContinentHeroProps {
  name?: string;
  description?: string;
  image?: IImage;
}

export const ContinentHeroLoading = () => (
  <div className="country-continent-hero bg-gray-300 animate-pulse" />
);

export const ContinentHero: React.FC<ContinentHeroProps> = ({
  name,
  description,
  image,
}) => {
  return (
    <div className="relative country-continent-hero flex justify-center lg:justify-start items-center lg:px-48 bg-gray-400">
      {/* <div className="flex flex-col gap-2 z-10 text-white "> */}
      <h1 className="z-10 text-10xl uppercase font-league-gothic text-white pb-12">
        {name}
      </h1>
      {/* </div> */}

      <div className="hidden md:block absolute bottom-20 right-0 bg-black/80 p-8 pr-24 z-10 text-white">
        <p className="lg:w-[720px]">{description}</p>
      </div>

      {/* <div className="flex flex-col justify-self-end gap-2 z-10 text-white"></div> */}

      {/* <div className="absolute bottom-20 right-0 text-white z-10">
        <h1 className="z-10 text-10xl uppercase font-league-gothic">{name}</h1>
        <p className="bg-black/80 p-8 pr-24 z-10 lg:w-[920px]">{description}</p>
      </div> */}

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
