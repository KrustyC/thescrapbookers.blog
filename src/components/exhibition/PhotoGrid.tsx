import { Image as IImage } from "@/types/global";
import Image from "next/image";
import { ButtonLink } from "@/components/uikit/ButtonLink";

const SHOP_URL = "https://dcrestini.me";

interface PhotoGridProps {
  title?: string;
  image?: IImage;
}

export const PhotoGrid: React.FC<PhotoGridProps> = () => {
  return (
    <div className="py-24 px-4 lg:px-40 h-[350px] bg-black text-white flex justify-between items-center">
      <div className="flex gap-3 bg-[red]">
        <h2 className="text-6xl uppercase">Shop our prints</h2>
        <p className="text-xs w-[240px]">
          The scary 'burning' or 'smoky' season had already made the air heavy
          and hazy in Northern
        </p>
      </div>


      <ButtonLink variant="black-outlined" href={SHOP_URL} target="_blank">
        Shop now
      </ButtonLink>
    </div>
  );
};
