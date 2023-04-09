import format from "date-fns/format";
import Image from "next/image";
import Link from "next/link";
import type { Post as IPost } from "types/global";
import { poppins } from "utils/fonts";

const DEFAULT_IMAGE = ""; // @TODO Ask Bea to do a nice default image

export const Post: React.FC<IPost> = ({
  title,
  slug,
  smallIntro,
  thumbnailImage,
  category,
  date,
}) => {
  const href = `/post/${slug}`;

  return (
    <div className="flex flex-col w-full">
      <Link href={href} className="flex w-full aspect-square relative">
        <Image
          sizes="100%"
          fill
          src={thumbnailImage?.url || DEFAULT_IMAGE}
          alt="man doing something"
          style={{ objectFit: "cover" }}
        />
      </Link>
      <div className="flex items-center mt-6 uppercase tracking-widest text-xs text-gray-400 " style={poppins.style}>
        <span>{category}</span>
        <div className="border-r-2 h-2 mx-2" />
        <span>{format(new Date(date), "MMMM dd, yyyy")}</span>
      </div>
      <Link href={href}>
        <h3 className="text-3xl mt-4 text-black font-medium">{title}</h3>
      </Link>
      <span className="text-xl mt-4 text-gray-500">{smallIntro}</span>
    </div>
  );
};
