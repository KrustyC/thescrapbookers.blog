import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Organization, WithContext } from "schema-dts";

import { PreviewBadge } from "@/components/PreviewBadge";
import { routing } from "@/i18n/routing";
import { AppLocale } from "@/types/global";
import { leagueGothic, merriweather, ooohBaby, poppins } from "@/utils/fonts";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "Home.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Travel",
      "South East Asia",
      "Asia",
      "Europe",
      "Blog",
      "Digital Nomads",
    ],
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
      url: new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/the_scrapbookers.webp`,
          height: 569,
          width: 853,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/the_scrapbookers.webp`,
          height: 569,
          width: 853,
        },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { isEnabled: isPreviewEnabled } = await draftMode();

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const jsonLd: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    name: "The Scrapbookers",
    logo: "/icons/favicon-48x48.png",
  };

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${leagueGothic.variable} ${ooohBaby.variable} ${merriweather.variable}`}
    >
      <head>
        <GoogleTagManager gtmId="GTM-TDQDTN97" />

        <Script
          id="website-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-poppins">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>

      <Analytics />
      <SpeedInsights />

      {isPreviewEnabled && <PreviewBadge />}

      {process.env.NEXT_PUBLIC_ENVIRONMENT === "production" && (
        <>
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
          />

          {/* @TODO
           * Check this https://nextjs.org/docs/app/building-your-application/optimizing/scripts
           * Once Partytown and worker are supported in app folder, we can use them here
           */}
        </>
      )}
    </html>
  );
}
