import Image from "next/image";

import type { Post as IPost } from "@/types/global";
import { Link } from "@/utils/navigation";

type DigitalNomadingPost = Pick<
  IPost,
  "title" | "href" | "smallIntro" | "thumbnailImage" | "category" | "date"
>;

interface PostProps {
  posts: DigitalNomadingPost[];
}

export const DigitalNomadingCarousel: React.FC<PostProps> = ({ posts }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8">
      {posts.map((post) => (
        <Link key={post.href} href={post.href || "/"} className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="w-full h-[100px] lg:h-[300px] xl:h-[350px] relative rounded-xl drop-shadow-xl">
              <Image
                fill
                className="rounded-xl bg-gray-300"
                src={post.thumbnailImage?.url || ""}
                alt={post.thumbnailImage?.description || "missing image"}
                title={post.thumbnailImage?.title || "missing image"}
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3 className="text-sm lg:text-base text-black font-semibold">
              {post.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};
