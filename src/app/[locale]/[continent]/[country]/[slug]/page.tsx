import { format } from "date-fns";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getTranslations } from "next-intl/server";
import { BlogPosting, WithContext } from "schema-dts";

import { BlogPost } from "@/components/BlogPost/BlogPost";
import { getPost } from "@/graphql/queries/get-post.query";
import { Link } from "@/i18n/navigation";
import { ArticleNotFoundIcon } from "@/icons/ArticleNotFound";
import { AppLocale } from "@/types/global";
// import { LOCALES } from "@/utils/constants";
import { createAlternates } from "@/utils/urls";

interface PostPageProps {
  params: Promise<{ slug: string; locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  try {
    const { isEnabled } = await draftMode();
    const { post } = await getPost({ slug, locale, isPreview: isEnabled });

    if (!post) {
      return {};
    }

    const title = post.metaTitle;
    const description = post.smallIntro;
    const images = post.mainImage?.url
      ? [
          {
            url: new URL(post.mainImage.url),
            height: post.mainImage?.details.height || 569,
            width: post.mainImage?.details.width || 853,
          },
        ]
      : [];

    return {
      title,
      description,
      creator: post.author?.name,
      alternates: post.href ? createAlternates({ path: post.href }) : undefined,
      openGraph: {
        title,
        description,
        siteName: "The Scrapbookers",
        images,
        locale,
        url: new URL(
          `${locale === "it" ? `/${locale}` : ""}${post.href || ""}`,
          process.env.NEXT_PUBLIC_BASE_URL
        ),
      },
      twitter: { card: "summary_large_image", title, description, images },
    };
  } catch (error) {
    return {};
  }
}

// export function generateStaticParams() {
//   return LOCALES.map((locale) => ({ locale }));
// }

export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params;

   

  const { isEnabled } = await draftMode();
  const { post, nextPost } = await getPost({
    slug,
    locale,
    isPreview: isEnabled,
  });

  const t = await getTranslations({ locale, namespace: "BlogPost" });

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-12">
        <ArticleNotFoundIcon className="h-[180px] w-[320px] lg:h-[480px] lg:w-[620px]" />
        <h2 className="text-2xl lg:text-4xl w-[320px] mt-8 text-center">
          {t("notFound.message")}
        </h2>
        <Link
          href="/"
          className="bg-black px-6 pt-2 pb-4 w-fit font-bold inline-block mt-8"
        >
          <span className="text-xl text-white">{t("notFound.cta")}</span>
        </Link>
      </div>
    );
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}${post.href || ""}`;

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#BlogPosting`,
    name: post.title,
    description: post.metaDescription,
    datePublished: post.date
      ? format(new Date(post.date), "yyyy-MM-dd")
      : undefined,
    author: {
      "@type": "Person",
      "@id": `${post.author?.name}/#Person`,
      name: post.author?.name,
    },
    image: {
      "@type": "ImageObject",
      "@id": `${post.thumbnailImage?.url}/#ImageObject`,
      url: post.thumbnailImage?.url,
      height: "362",
      width: "388",
    },
    url,
  };

  return (
    <>
      <BlogPost
        post={post}
        nextPost={nextPost}
        locale={locale}
        copy={{
          shareText: t("shareText"),
          timeToRead: t("timeToRead"),
          writtenByText: t("writtenBy"),
        }}
      />

      <script
        id="json-ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
