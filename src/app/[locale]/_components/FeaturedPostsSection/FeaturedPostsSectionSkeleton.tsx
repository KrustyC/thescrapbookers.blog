import { PostCardLoading } from "@/components/PostCard/PostCard";

export const FeaturedPostsSectionSkeleton = () => {
  return (
    <section className="section-layout">
      <div className="w-2/3 mb-12 animate-pulse h-10 pulse bg-gray-300" />

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <PostCardLoading key={i} />
        ))}
      </div>
    </section>
  );
};
