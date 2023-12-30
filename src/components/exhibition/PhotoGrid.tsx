import { Image as IImage } from "@/types/global";
// import Image from "next/image";

const SHOP_URL = "https://dcrestini.me";

interface PhotoGridProps {
  title?: string;
  image?: IImage;
}

export const PhotoGrid: React.FC<PhotoGridProps> = () => {
  return (
    <div className="py-24 px-4 lg:px-40 h-[350px] bg-black text-white flex justify-between items-center">
      <div className="grid grid-cols-3 gap-12">
        Ciao
      </div>
    </div>
  );
};
