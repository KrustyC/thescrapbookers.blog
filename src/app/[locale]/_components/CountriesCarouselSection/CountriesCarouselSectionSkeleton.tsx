import classNames from "classnames";

export const CountriesCarouselSectionSkeleton: React.FC = () => {
  return (
    <div className="my-16 lg:mt-32 flex gap-10 overflow-y-hidden">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={classNames(
            "h-[500px] lg:h-[550px] w-full lg:w-1/4 loading-background-animation rounded-2xl",
            {
              "hidden md:block": i > 1,
              "hidden lg:block": i > 2,
            }
          )}
        />
      ))}
    </div>
  );
};
