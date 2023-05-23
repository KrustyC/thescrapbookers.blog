import { AppLocale } from "@/types/global";
import { leagueGothic } from "@/utils/fonts";

interface TitleProps {
  titlePart1: string;
  titlePart2: string;
  author: string;
  subtitle: string;
  locale: AppLocale;
}

export const Title: React.FC<TitleProps> = ({
  titlePart1,
  titlePart2,
  author,
  subtitle,
  locale,
}) => {
  return (
    <div className="-mt-24 flex flex-col px-6 lg:px-16 xl:px-24 z-10 text-white">
      <h1
        style={leagueGothic.style}
        className="text-5xl lg:text-10xl leading-[3.5rem] lg:leading-[9rem] font-bold w-full uppercase"
      >
        {titlePart1} <br />
        {titlePart2}
      </h1>
      <div className="flex justify-between items-center">
        <p className="max-w-[600px] text-3xl">{subtitle}</p>
        <span className="uppercase text-5xl" style={leagueGothic.style}>
          {author}
        </span>
      </div>
    </div>
  );
};
