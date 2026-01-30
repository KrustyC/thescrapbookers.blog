import Image from "next/image";

import { ShareButton } from "@/components/ShareButton";
import { AppLocale, Author } from "@/types/global";
import { formatDate, getFormat } from "@/utils/date";

import beaPic from "../../../public/images/bea_near_a_wat.webp";
import davidePic from "../../../public/images/davide_holding_hero_rat.webp";

interface ArticleAuthorAndPublishDateProps {
  author: Author;
  publishedDate: Date;
  locale: AppLocale;
  timeToRead: number;
  copy: {
    timeToRead: string;
    shareText: string;
    writtenByText: string;
  };
}

export const ArticleAuthorAndPublishDate: React.FC<
  ArticleAuthorAndPublishDateProps
> = ({ author, timeToRead, publishedDate, copy, locale }) => {
  const authorImage = getAuthorImage(author.name);

  return (
    <div className="flex justify-between items-center mt-10 lg:mt-16 lg:w-[720px] mx-6 lg:mx-auto">
      <div className="flex gap-3 md:gap-4">
        <div>
          {authorImage ? (
            <div className="h-14 w-14 lg:h-16 lg:w-16 rounded-full relative">
              <Image
                className="rounded-full"
                src={authorImage.img}
                alt={authorImage.alt}
                title={authorImage.title}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-center gap-1 text-sm md:text-base">
          <p>
            <span className="text-gray-500">{copy.writtenByText}</span>{" "}
            {author?.name}
          </p>

          <p className="text-xs md:text-sm">
            {formatDate({
              date: new Date(publishedDate),
              format: getFormat(locale),
              locale,
            })}{" "}
            • {timeToRead} {copy.timeToRead}
          </p>
        </div>
      </div>
      <ShareButton title="The Scrapbookers" text={copy.shareText} />
    </div>
  );
};

function getAuthorImage(authorName: string | undefined) {
  switch (authorName) {
    case "Davide Crestini":
      return {
        img: davidePic,
        alt: "Davide smiling while holding a rat",
        title: "Davide",
      };
    case "Beatrice Cox":
      return {
        img: beaPic,
        alt: "Bea smiling while holding a bhan mi",
        title: "Bea",
      };
    default:
      return null;
  }
}
