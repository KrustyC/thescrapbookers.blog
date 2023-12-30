import { Image as IImage } from "@/types/global";
import Image from "next/image";

interface ExhibitionHeroProps {
  title?: string;
  image?: IImage;
}

export const ExhibitionHeroLoading = () => (
  <div className="country-continent-hero bg-gray-300 animate-pulse" />
);

export const ExhibitionHero: React.FC<ExhibitionHeroProps> = ({
  title,
  image,
}) => {
  return (
    <div className="relative top-0 h-[100vh] lg:h-[1400px] bg-gray-300">
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <Image
          src={image?.url || ""}
          alt={image?.description || "Missing description"}
          title="logo"
          sizes="100%"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="absolute px-4 lg:px-40 w-full top-[150px] z-10 text-white flex justify-between gap-x-24">
        <h1 className="w-2/5 text-8xl font-league-gothic">
          {title || "Missing Title"}
        </h1>

        <div className="flex flex-col gap-y-3 w-3/5">
          <div className="flex mt-20">
            <span className="mr-24">07.12.23 - 13.12.23</span>
            <span>Palazzo Pretorio</span>
          </div>
          <p className="text-sm pr-12">
            Bilanciando il viaggiare e il lavoro ci siamo trovati a fare qualche
            scatto in momenti semplici ma significativi. Ogni scatto non mira a
            definire una verità assoluta, né pretende di distorcere la realtà; è
            piuttosto un frammento delle nostre riflessioni, un racconto visivo
            di luoghi che ci hanno, in qualche senso, trasformati.
          </p>
        </div>
      </div>

      <div className="h-48 flex items-center w-screen absolute px-4 lg:px-40 bottom-0 left-0 right-0 z-10 bg-black/60">
        <span className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </span>
      </div>
    </div>
  );
};
