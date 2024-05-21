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
    <div className="-mt-24 lg:-mt-48 flex flex-col px-6 lg:px-16 xl:px-24 z-10 text-white/80">
      <h1 className="text-7xl lg:text-9xl xl:text-10xl leading-[4.5rem] lg:leading-[5.5rem] font-semibold w-full uppercase font-league-gothic">
        {titlePart1} <br />
        {titlePart2}
      </h1>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-0">
        <p className="lg:max-w-[600px] text-xl md:text-2xl lg:text-3xl lg:!font-light font-poppins">
          {subtitle}
        </p>
        <span className="uppercase text-4xl lg:text-7xl font-league-gothic">
          {author}
        </span>
      </div>
    </div>
  );
};
