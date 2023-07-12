import Image from "next/image";
import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/uikit/ButtonLink";
import type { AppLocale, Post as IPost } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";

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
  const t = useTranslations("Home.DigitalNomading");

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex items-end w-full aspect-square lg:aspect-[4/3] relative bg-gray-200 rounded-2xl drop-shadow-lg border-2 overflow-hidden border-black">
        <Image
          fill
          src={thumbnailImage?.url || ""}
          alt={thumbnailImage?.description || "missing image"}
          loading="lazy"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col text-black lg:px-6 w-full">
        <h3 className="text-3xl text-black font-semibold">{title}</h3>

        <div className="flex items-center my-2 uppercase tracking-widest text-regular">
          <span>{category}</span>
          <div className="border-r-2 border-black h-3 mx-2" />

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

        <span className="text-lg mb-4 lg:mb-8">{smallIntro}</span>

        <ButtonLink
          variant="black"
          size="sm"
          href={href || "/"}
          prefetch={false}
        >
          {t("readMoreCTA")}
        </ButtonLink>
      </div>
    </div>
  );
};
