interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="z-10 py-12 lg:py-32 h-full w-full flex items-end px-6 lg:px-16 xl:px-48">
      <h1 className="text-white lg:text-white/80 text-[80px] lg:text-8xl leading-[4.5rem] lg:leading-[5.5rem] font-medium uppercase font-league-gothic lg:w-[700px]">
        {title}
      </h1>
    </div>
  );
};
