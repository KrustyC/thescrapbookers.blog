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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;

  setRequestLocale(appLocale);

  const t = await getTranslations({
    locale: appLocale,
    namespace: "AllArticles",
  });

  const { posts } = await getLatestPosts({
    limit: 40,
    locale: appLocale,
  });

  return (
    <div className="flex flex-col gap-8 py-16 w-full md:w-4/5 lg:w-4/5 max-w-[1280px] mx-auto">
      <AnimatedPosts title={t("title")} posts={posts} locale={appLocale} />
    </div>
  );
}
