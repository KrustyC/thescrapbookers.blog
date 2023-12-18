import { Image as IImage } from "@/types/global";

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
    <div className="relative flex justify-start lg:justify-start items-end px-2 lg:px-48 py-24 bg-gray-300">
      <h1 className="text-8xl lg:text-10xl uppercase font-league-gothic z-10 text-white -mb-[13px]">
        {title || "Missing Title"}
      </h1>
    </div>
  );
};
