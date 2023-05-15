import { Navbar } from "components/Navbar";
import { Footer } from "components/Footer";
import { AppLocale } from "types/global";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface IntroductionPageProps {
  params: {
    locale: AppLocale;
  };
}

export async function generateMetadata({
  params: { locale },
}: IntroductionPageProps): Promise<Metadata> {
  const t = await getTranslations("AboutUs.Metadata");

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(
      process.env.baseUrl || "https://thescrapbookers.blog"
    ),
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
      images: [
        {
          url: "/images/about-us.jpg",
          height: 1792,
          width: 2048,
        },
      ],
      locale,
    },
  };
}

export default function AboutUsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: AppLocale };
}) {
  return (
    <div>
      <Navbar locale={params.locale} />

      <div>{children}</div>

      <Footer locale={params.locale} />
    </div>
  );
}