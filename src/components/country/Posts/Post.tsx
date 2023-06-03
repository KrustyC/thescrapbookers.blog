import Image from "next/image";
import Link from "next-intl/link";

import type { AppLocale, Post as IPost } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";
import { poppins } from "@/utils/fonts";

interface CountryPostProps {
  post: IPost;
  locale: AppLocale;
}

export const CountryPostLoading = () => (
  <div className="flex flex-col w-full">
    <div className="loading-background w-full aspect-square rounded-2xl" />

    <div className="flex items-center mt-4 h-4">
      <div className="h-4 w-1/2 loading-background" />
      <div className="border-r-2 h-2 mx-2 loading-background" />
      <div className="h-4 w-1/2 loading-background" />
    </div>

    <div className="h-10 my-4 loading-background" />

    <div className="flex flex-col gap-2 loading-background">
      <div className="h-4 loading-background" />
      <div className="h-4 loading-background" />
      <div className="h-4 loading-background" />
    </div>
  </div>
);

export const CountryPost: React.FC<CountryPostProps> = ({
  post: { title, href, smallIntro, thumbnailImage, category, date },
  locale,
}) => {
  return (
    <div className="flex flex-col w-full">
      <Link
        href={href}
        className="flex w-full aspect-square relative bg-gray-200 rounded-2xl"
        prefetch={false}
      >
        <Image
          className="rounded-2xl"
          sizes="100%"
          fill
          src={thumbnailImage?.url || ""}
          alt={thumbnailImage?.description || "default image"}
          loading="lazy"
          style={{ objectFit: "cover" }}
        />
      </Link>
      <div
        className="flex items-center mt-6 md:mt-4 lg:mt-6 uppercase tracking-widest text-black text-sm md:text-xs lg:text-lg"
        style={poppins.style}
      >
        <span>{category}</span>
        <div className="border-r-2 border-black h-3 mx-2" />
        <span>
          {formatDate({
            date: new Date(date),
            format: getFormat(locale),
            locale,
          })}
        </span>
      </div>
      <Link href={href}>
        <h3 className="text-2xl lg:text-3xl my-2 md:my-3 lg:my-4 text-black font-medium">
          {title}
        </h3>
      </Link>
      <span className="text-lg lg:text-xl text-black line-clamp-3">
        {smallIntro}
      </span>
    </div>
  );
};
