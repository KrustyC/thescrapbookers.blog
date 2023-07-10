const POST_COUNTS = [1, 2, 3];

export const FeaturedPostsSectionSkeleton = () => {
  return (
    <section className="section-layout">
      <div className="w-2/3 mb-12 animate-pulse h-10 pulse bg-gray-300" />

      <div className="flex flex-col md:flex-row gap-12 md:gap-8 lg:gap-16">
        {POST_COUNTS.map((_, i) => (
          <div key={i} className="flex flex-col w-full animate-pulse">
            <div className="flex w-full aspect-square relative bg-gray-300 rounded-2xl" />

            <div className="flex items-center mt-4 h-4">
              <div className="bg-gray-300 h-4 w-1/2" />
              <div className="border-r-2 h-2 mx-2" />
              <div className="bg-gray-300 h-4 w-1/2" />
            </div>

            <div className="bg-gray-300 h-10 my-4" />

            <div className="flex flex-col gap-2">
              <div className="bg-gray-300 h-4" />
              <div className="bg-gray-300 h-4" />
              <div className="bg-gray-300 h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
