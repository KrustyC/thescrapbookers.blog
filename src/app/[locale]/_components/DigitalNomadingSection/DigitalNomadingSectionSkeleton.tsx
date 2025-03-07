export const DigitalNomadingSectionSkeleton = () => {
  return (
    <section className="py-16 lg:py-20 px-6 lg:px-16 xl:px-48 w-full bg-primary">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex items-end w-full aspect-square lg:aspect-4/3 relative bg-gray-200 rounded-2xl drop-shadow-lg bg-gray-400 border-2 border-black">
          <div className="h-full w-full  loading-background-animation rounded-xl" />
        </div>

        <div className="flex flex-col text-black lg:px-6 w-full">
          <div className="h-10 w-full loading-background-animation" />

          <div className="flex items-center my-4">
            <span className="h-6 w-24 loading-background-animation" />
            <div className="border-r-2 border-black h-3 mx-2" />
            <span className="h-6 w-32 loading-background-animation" />
          </div>

          <div className="flex flex-col gap-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-full loading-background-animation"
              />
            ))}
          </div>

          <div className="mt-6 w-36 text-sm h-12 min-w-16 lg:min-w-24 px-4 lg:px-8 rounded-xl loading-background-animation" />
        </div>
      </div>
    </section>
  );
};
