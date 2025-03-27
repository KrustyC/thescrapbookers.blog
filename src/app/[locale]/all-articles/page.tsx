import { getTranslations, setRequestLocale } from "next-intl/server";

import { getLatestPosts } from "@/graphql/queries/get-latest-posts.query copy";
import { routing } from "@/i18n/routing";
import { AppLocale } from "@/types/global";

import { AnimatedPosts } from "./_components/AnimatedPosts";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AllArticles" });

  const { posts } = await getLatestPosts({
    limit: 40,
    locale,
  });

  return (
    <div className="flex flex-col gap-8 py-16 w-full md:w-4/5 lg:w-4/5 max-w-[1280px] mx-auto">
      <AnimatedPosts title={t("title")} posts={posts} locale={locale} />
    </div>
  );
}
