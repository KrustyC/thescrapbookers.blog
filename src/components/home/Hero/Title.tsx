import { AppLocale } from "@/types/global";
import { leagueGothic } from "@/utils/fonts";

interface TitleProps {
  titlePart1: string;
  titlePart2: string;
  author: string;
  subtitle: string;
}

export const Title: React.FC<TitleProps> = ({
  titlePart1,
  titlePart2,
  author,
  subtitle,
}) => {
  return (
    <div className="-mt-24 flex flex-col px-6 lg:px-16 xl:px-24 z-10 text-white">
      <h1
        style={leagueGothic.style}
        className="text-7xl lg:text-10xl leading-[4rem] lg:leading-[9rem] font-bold w-full uppercase"
      >
        {titlePart1} <br />
        {titlePart2}
      </h1>
      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
        <p className="lg:max-w-[600px] text-xl lg:text-3xl font-light">{subtitle}</p>
        <span className="uppercase text-3xl lg:text-5xl" style={leagueGothic.style}>
          {author}
        </span>
      </div>
    </div>
  );
};
