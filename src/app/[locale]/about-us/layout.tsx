import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AppLocale } from "@/types/global";
import { createAlternates } from "@/utils/urls";

interface IntroductionPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: IntroductionPageProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "AboutUs.Metadata" });

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://thescrapbookers.blog";

  return {
    title: `${t("title")} | The Scrapbookers`,
    description: t("description"),
    metadataBase: new URL(baseUrl),
    alternates: createAlternates({ path: "/about-us" }),
    authors: [
      { name: "Davide Crestini", url: "https://dcrestini.me" },
      { name: "Beatrice Cox", url: "https://beatricecox.com" },
    ],
    creator: "Davide Crestini",
    publisher: "Beatrice Cox",
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "The Scrapbookers",
      images: [{ url: "/images/about_us.webp", height: 1792, width: 2048 }],
      locale,
    },
  };
}

export default async function AboutUsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <Navbar blackText locale={locale} />

      <div className="w-full">{children}</div>

      <div className="-mt-12 sm:-mt-24 md:-mt-28 lg:-mt-40 2xl:-mt-48">
        <Footer locale={locale} />
      </div>
    </div>
  );
}
