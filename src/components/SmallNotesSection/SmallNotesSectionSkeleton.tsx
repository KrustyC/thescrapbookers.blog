import { LoadingSectionWithTitle } from "@/components/SectionWIthTitle/LoadingSectionWithTitle";

const POST_COUNTS = [1, 2, 3, 4];

export const SmallNotesSectionSkeleton = () => {
  return (
    <LoadingSectionWithTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-12 gap-x-16">
        {POST_COUNTS.map((_, i) => (
          <div key={i} className="flex flex-col w-full animate-pulse">
            <div className="w-full mb-2 lg:mb-4 bg-gray-300 h-4" />
            <div className="flex items-center uppercase tracking-widest text-xs text-gray-400 h-2 bg-gray-300" />
          </div>
        ))}
      </div>
    </LoadingSectionWithTitle>
  );
};
