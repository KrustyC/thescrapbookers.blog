import Image from "next/image";

import type { AppLocale, Post as IPost } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";
import { ButtonLink } from "@/components/uikit/ButtonLink";

const DEFAULT_IMAGE = ""; // @TODO Ask Bea to do a nice default image

interface PostProps {
  post: IPost;
  locale: AppLocale;
}

export const SinglePost: React.FC<PostProps> = ({
  post: { title, href, smallIntro, thumbnailImage, category, date },
  locale,
}) => {
  return (
    <div className="flex gap-x-8">
      <div className="flex items-end w-full aspect-[4/3] relative bg-gray-200 rounded-2xl drop-shadow-lg bg-gray-400 border-2 border-black">
        <Image
          className="rounded-2xl"
          sizes="100%"
          fill
          src={thumbnailImage?.url || DEFAULT_IMAGE}
          alt={thumbnailImage?.description || "default image"}
          loading="lazy"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col text-black px-6 w-full">
        <h3 className="text-3xl text-black font-semibold">{title}</h3>

        <div className="flex items-center my-2 uppercase tracking-widest text-regular">
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

        <span className="text-lg mb-8">{smallIntro}</span>

        <ButtonLink variant="black" size="sm" href={href} prefetch={false}>
          Read More
        </ButtonLink>
      </div>
    </div>
  );
};
