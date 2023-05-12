import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArticleNotFoundIcon } from "icons/ArticleNotFound";
import { AppLocale } from "types/global";
import { BlogPost } from "components/BlogPost/BlogPost";
import { getPost } from "utils/api";
import Link from "next-intl/link";
interface PostPageProps {
  params: {
    slug: string;
    locale: AppLocale;
  };
}

export async function generateMetadata({
  params: { slug, locale },
}: PostPageProps): Promise<Metadata> {
  try {
    const { post } = await getPost(slug, locale);

    if (!post) {
      return {};
    }

    return {
      title: post.title,
      description: post.smallIntro,
      creator: post.author.name,
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
  } catch (error) {
    return {};
  }
}

export default async function PostPage({
  params: { slug, locale },
}: PostPageProps) {
  const { post, nextPost } = await getPost(slug, locale);
  const t = await getTranslations("BlogPost");

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-12">
        <ArticleNotFoundIcon className="h-[180px] w-[320px] lg:h-[480px] lg:w-[620px]" />
        <h2 className="text-2xl lg:text-4xl w-[320px] w-3/4 mt-8 text-center">
          {t("notFound.message")}
        </h2>
        <Link
          href="/"
          className="bg-black px-6 pt-2 pb-4 w-fit font-bold inline-block mt-8"
        >
          <span className="text-xl text-white">
            {t("notFound.cta")}
          </span>
        </Link>
      </div>
    );
  }

  return (
    <BlogPost
      post={post}
      nextPost={nextPost}
      locale={locale}
      copy={{
        writtenByText: t("writtenBy"),
      }}
    />
  );
}
