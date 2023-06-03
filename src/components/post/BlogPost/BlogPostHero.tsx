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
      <div className="z-10 flex flex-col items-center justify-end gap-4 lg:gap-6 absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-black/0 to-black/50 pb-8">
        {post.country ? <Breadcrumbs country={post.country} /> : null}
        <h1 className="lg:w-[530px] text-4xl lg:text-6xl leading-[3.5rem] lg:leading-[5rem] font-bold text-center text-white">
          {post.title}
        </h1>
        <p className="text-center lg:w-[480px] text-white">{post.smallIntro}</p>

        <a
          href="#post-content"
          className="flex items-center justify-center h-7 w-7 lg:h-10 lg:w-10 bg-white/60 rounded-full"
        >
          <ChevronDown className="w-4 h-4 text-black" />
        </a>
      </div>

      <Image
        className="loading-background"
        sizes="100%"
        fill
        priority
        src={post.mainImage.url}
        alt={post.mainImage.description}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
