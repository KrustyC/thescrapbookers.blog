import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getTranslations } from "next-intl/server";

import { BlogPost } from "@/components/BlogPost/BlogPost";
import { getPost } from "@/graphql/queries/get-post.query";
import { Link } from "@/i18n/navigation";
import { ArticleNotFoundIcon } from "@/icons/ArticleNotFound";
import { AppLocale } from "@/types/global";
import { createAlternates } from "@/utils/urls";

interface PostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const appLocale = locale as AppLocale;
  try {
    const { isEnabled } = await draftMode();
    const { post } = await getPost({
      slug,
      locale: appLocale,
      isPreview: isEnabled,
    });

    if (!post) {
      return {};
    }

    const title = post.metaTitle;
    const description = post.metaDescription;

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
        locale: appLocale,
        url: new URL(
          `${appLocale === "it" ? `/${appLocale}` : ""}${post.href || ""}`,
          process.env.NEXT_PUBLIC_BASE_URL
        ),
      },
      twitter: { card: "summary_large_image", title, description, images },
    };
  } catch (error) {
    return {};
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params;
  const appLocale = locale as AppLocale;

  const { isEnabled } = await draftMode();
  const { post, nextPost } = await getPost({
    slug,
    locale: appLocale,
    isPreview: isEnabled,
  });

  const t = await getTranslations({ locale: appLocale, namespace: "BlogPost" });

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

  return (
    <BlogPost
      post={post}
      nextPost={nextPost}
      locale={appLocale}
      copy={{
        shareText: t("shareText"),
        timeToRead: t("timeToRead"),
        writtenByText: t("writtenBy"),
      }}
    />
  );
}
