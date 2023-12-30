import Image from "next/image";

import { ButtonLink } from "@/components/uikit/ButtonLink";
import { Image as IImage } from "@/types/global";

const SHOP_URL = "https://dcrestini.me";

interface ShopProps {
  title?: string;
  image?: IImage;
}

export const Shop: React.FC<ShopProps> = () => {
  return (
    <div className="py-24 px-4 lg:px-40 h-[350px] bg-black text-white flex justify-between items-center">
      <div className="flex items-center gap-12">
        <h2 className="font-league-gothic text-8xl uppercase">Shop our prints</h2>
        <p className="text-xs w-[240px]">
          The scary burning or smoky season had already made the air heavy and
          hazy in Northern
        </p>
      </div>

      <ButtonLink variant="black-outlined" href={SHOP_URL} target="_blank">
        Shop now
      </ButtonLink>
    </div>
  );
};
