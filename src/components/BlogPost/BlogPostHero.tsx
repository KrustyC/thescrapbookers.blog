import Image from "next/image";

import { ChevronDown } from "@/icons/ChevronDown";
import { Post } from "@/types/global";

import { Breadcrumbs } from "./Breadcrumbs";

interface BlogPostHeroProps {
  post: Post;
}

export const BlogPostHeroLoading = () => (
  <div className="relative h-[650px] lg:h-[750px] w-full loading-background-animation" />
);

export const BlogPostHero: React.FC<BlogPostHeroProps> = ({ post }) => {
  return (
    <div className="relative h-[650px] lg:h-[750px]">
      <div className="z-10 flex flex-col items-center justify-between pt-24 gap-4 lg:gap-6 absolute top-0 bottom-0 right-0 left-0 bg-linear-to-b from-black/0 to-black/50 pb-8">
        <div className="flex flex-col justify-center items-center gap-y-4 flex-1">
          {post.country ? (
            <div className="mt-8">
              <Breadcrumbs country={post.country} />
            </div>
          ) : null}
          <h1 className="lg:w-[720px] text-4xl lg:text-6xl leading-[3.5rem] lg:leading-[5rem] font-bold text-center text-white">
            {post.title}
          </h1>
        </div>

        <a
          href="#post-content"
          className="flex items-center justify-center justify-self-end h-7 w-7 lg:h-10 lg:w-10 bg-white/60 rounded-full"
        >
          <ChevronDown className="w-4 h-4 text-black" />
        </a>
      </div>

      <Image
        className="loading-background"
        fill
        priority
        src={post.mainImage?.url || ""}
        alt={post.mainImage?.description || "missing image"}
        title={post.mainImage?.title || "missing image"}
        objectFit="cover"
      />
    </div>
  );
};
