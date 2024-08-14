import Image from "next/image";

import type { AppLocale, Post as IPost } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";
import { Link } from "@/utils/navigation";

interface PostProps {
  post: Pick<
    IPost,
    "title" | "href" | "smallIntro" | "thumbnailImage" | "category" | "date"
  >;
  locale: AppLocale;
}

export const SinglePost: React.FC<PostProps> = ({
  post: { title, href, smallIntro, thumbnailImage, category, date },
  locale,
}) => {
  return (
    <Link href={href || "/"}>
      <div className="w-full aspect-square relative bg-gray-200 rounded-2xl drop-shadow-xl overflow-hidden border-black">
        <Image
          fill
          src={thumbnailImage?.url || ""}
          alt={thumbnailImage?.description || "missing image"}
          title={thumbnailImage?.title || "missing image"}
          loading="lazy"
          style={{ objectFit: "cover" }}
        />

        <div className="absolute bottom-0 right-0 left-0 flex flex-col w-full p-5 bg-gradient-to-r from-black to-white/5">
          <h3 className="text-xl lg:text-2xl text-white font-semibold">
            {title}
          </h3>

          <div className="flex items-center my-2 uppercase tracking-widest text-sm lg:text-base text-white">
            <span>{category}</span>
            <div className="border-r-2 border-white h-3 mx-2" />

            <span>
              {date
                ? formatDate({
                    date: new Date(date),
                    format: getFormat(locale),
                    locale,
                  })
                : "Missing Date"}
            </span>
          </div>

          <span className="hidden lg:block text-sm line-clamp-4 xl:line-clamp-5 text-white">
            {smallIntro}
          </span>
        </div>
      </div>
    </Link>
  );
};
