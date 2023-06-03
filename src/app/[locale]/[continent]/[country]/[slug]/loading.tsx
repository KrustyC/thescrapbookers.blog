import { BlogPostHeroLoading } from "@/components/post/BlogPost/BlogPostHero";

export default function PostLoading() {
  return (
    <div className="flex flex-col">
      <BlogPostHeroLoading />

      <div className="w-full lg:w-[720px] flex flex-col px-6 lg:px-0">
        {new Array(8).fill(null).map((_, i) => (
          <div key={i} className="mb-4 h-4 w-full bg-gray-300" />
        ))}

        <br />
        <br />

        {new Array(8).fill(null).map((_, i) => (
          <div key={i} className="mb-4 h-4 w-full  bg-gray-300" />
        ))}
      </div>
    </div>
  );
}
