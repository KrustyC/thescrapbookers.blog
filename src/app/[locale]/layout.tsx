import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import { useLocale } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Organization, WithContext } from "schema-dts";

import { PreviewBadge } from "@/components/PreviewBadge";
import { AppLocale } from "@/types/global";
import { leagueGothic, merriweather, ooohBaby, poppins } from "@/utils/fonts";

interface Props {
  children: React.ReactNode;
  params: { locale: AppLocale };
}

export async function generateMetadata({
  params: { locale },
}: Pick<Props, "params">): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Home.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: ["Travel", "South East Asia", "Blog", "Digital Nomads"],
    authors: [
      { name: "Davide Crestini", url: "https://dcrestini.me" },
      { name: "Beatrice Cox", url: "https://beatricecox.com" },
    ],
    icons: {
      icon: "/favicon.ico",
      apple: "/icons/apple-touch-icon.png",
      other: [
        {
          url: "/icons/favicon-48x48.png",
          type: "image/png",
          sizes: "48x48",
        },
        {
          url: "/icons/favicon-32x32.png",
          type: "image/png",
          sizes: "32x32",
        },
        {
          url: "/icons/favicon-16x16.png",
          type: "image/png",
          sizes: "16x16",
        },
      ],
    },
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

export default function LocaleLayout({ children, params }: Props) {
  const locale = useLocale();
  const { isEnabled: isPreviewEnabled } = draftMode();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  unstable_setRequestLocale(locale);

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
        <Script
          id="website-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-poppins">{children}</body>
      <Analytics />
      <SpeedInsights />

      {isPreviewEnabled && <PreviewBadge />}

      {process.env.NEXT_PUBLIC_ENVIRONMENT === "production" && (
        <>
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
          />
          {/* <Script
            async
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          />
          <Script id="ga-script" strategy="lazyOnload">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
                `}
          </Script> */}

          {/* @TODO
           * Check this https://nextjs.org/docs/app/building-your-application/optimizing/scripts
           * Once Partytown and worker are supported in app folder, we can use them here
           */}
        </>
      )}
    </html>
  );
}
