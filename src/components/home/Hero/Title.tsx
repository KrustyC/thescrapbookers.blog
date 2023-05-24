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
        className="text-7xl md:text-8xl lg:text-9xl xl:text-10xl leading-[4rem] xl:leading-[9rem] font-bold w-full uppercase"
      >
        {titlePart1} <br />
        {titlePart2}
      </h1>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-0">
        <p className="lg:max-w-[600px] text-xl md:text-2xl lg:text-3xl font-light">{subtitle}</p>
        <span className="uppercase text-3xl md:text-4xl lg:text-5xl" style={leagueGothic.style}>
          {author}
        </span>
      </div>
    </div>
  );
};
