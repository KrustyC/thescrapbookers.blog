import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AppLocale } from "@/types/global";
import { createAlternates } from "@/utils/urls";

interface IntroductionPageProps {
  params: Promise<{ locale: string }>;
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
      locale,
      url: new URL(
        `${locale === "it" ? `/${locale}` : ""}/about-us`,
        process.env.NEXT_PUBLIC_BASE_URL
      ),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/about_us.webp`,
          height: 900,
          width: 1024,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/about_us.webp`,
          height: 900,
          width: 1024,
        },
      ],
    },
  };
}

export default async function AboutUsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <Navbar blackText locale={locale as AppLocale} />

      <div className="w-full">{children}</div>

      <div className="-mt-12 sm:-mt-24 md:-mt-28 lg:-mt-40 2xl:-mt-48">
        <Footer locale={locale as AppLocale} />
      </div>
    </div>
  );
}
