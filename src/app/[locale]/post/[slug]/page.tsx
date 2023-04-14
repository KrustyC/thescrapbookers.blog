import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogPostSkeleton } from "components/BlogPost/BlogPostSkeleton";
import BlogPost, { getPost } from "components/BlogPost/BlogPost";

interface PostpageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: PostpageProps): Promise<Metadata> {
  const { post } = await getPost(slug);

  return {
    title: post.title,
    description: post.smallIntro,
    creator: post.author.name,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.smallIntro,
      siteName: "The Scrapbookers",
      images: [
        {
          url: post.mainImage.url,
          height: post.mainImage.details.height || 450,
          width: post.mainImage.details.width || 800,
        },
      ],
      locale: "en-GB",
    },
  };
}

export default function Post({ params: { slug } }: PostpageProps) {
  return (
    <div>
      <Suspense fallback={<BlogPostSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <BlogPost slug={slug} />
      </Suspense>
    </div>
  );
}
