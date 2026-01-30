import Image from "next/legacy/image";

import { Link } from "@/i18n/navigation";
import { AppLocale, Post } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";

interface NextPostHeroProps {
  post: Pick<
    Post,
    "title" | "slug" | "date" | "mainImage" | "smallIntro" | "href"
  >;
  locale: AppLocale;
}

export const NextPostLoading = () => <div>Loading</div>;

export const NextPost: React.FC<NextPostHeroProps> = ({ post, locale }) => {
  return (
    <div className="w-full lg:w-[820px] 2xl:w-max mx-auto mt-10 lg:mt-24 flex flex-col">
      <Link
        href={post.href || ""}
        className="w-full h-[380px] relative loading-background"
      >
        <Image
          fill
          src={post.mainImage?.url || ""}
          alt={post.mainImage?.description || "missing image"}
          title={post.mainImage?.title || "missing image"}
          objectFit="cover"
        />
      </Link>

      <div className="flex flex-col px-6 lg:px-0">
        <div className="mt-8 mb-6 text-gray-400 uppercase tracking-wider font-600 rounded-full font-poppins">
          <span>
            {post.date
              ? formatDate({
                  date: new Date(post.date),
                  format: getFormat(locale),
                  locale,
                })
              : "Missing Date"}
          </span>
        </div>

        <Link href={post.href || ""}>
          <h2 className="text-5xl font-semibold text-black">{post.title}</h2>
        </Link>

        <span className="text-base mt-8 text-gray-500 w-full xl:w-3/4">
          {post.smallIntro}
        </span>
      </div>
    </div>
  );
};
