import { Suspense } from "react";
import type { Metadata } from "next";
import { AppLocale } from "types/global";
import { BlogPostSkeleton } from "components/BlogPost/BlogPostSkeleton";
import BlogPost, { getPost } from "components/BlogPost/BlogPost";

interface PostPageProps {
  params: {
    slug: string;
    locale: AppLocale;
  };
}

export async function generateMetadata({
  params: { slug, locale },
}: PostPageProps): Promise<Metadata> {
  const { post } = await getPost(slug, locale);

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
      locale,
    },
  };
}

export default function Post({ params: { slug, locale } }: PostPageProps) {
  return (
    <div>
      <Suspense fallback={<BlogPostSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <BlogPost slug={slug} locale={locale} />
      </Suspense>
    </div>
  );
}
