import { getLocale } from "next-intl/server";
import "./globals.css";

// import { Metadata } from "next";
import Script from "next/script";
// import { getLocale, getTranslations } from "next-intl/server";

import { crimsonPro } from "utils/fonts";
import { AppLocale } from "types/global";

// export async function generateMetadata(): Promise<Metadata> {
//   const t = await getTranslations("Home.Metadata");

//   return {
//     title: t("title"),
//     description: t("description"),
//     authors: [
//       { name: "Davide Crestini", url: "https://dcrestini.me" },
//       { name: "Beatrice Cox", url: "https://beatricecox.com" },
//     ],
//     icons: {
//       icon: "/favicon.ico",
//       apple: "/icons/apple-touch-icon.png",
//       other: [
//         {
//           url: "/icons/favicon-32x32.png",
//           type: "image/png",
//           sizes: "32x32",
//         },
//         {
//           url: "/icons/favicon-16x16.png",
//           type: "image/png",
//           sizes: "16x16",
//         },
//       ],
//     },
//     creator: "Davide Crestini",
//     publisher: "Beatrice Cox",
//     openGraph: {
//       title: t("title"),
//       description: t("description"),
//       siteName: "The Scrapbookers",
//       images: [
//         {
//           url: `${process.env.baseUrl}/images/about-us.jpg`,
//           height: 569,
//           width: 853,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: t("title"),
//       description: t("description"),
//       images: [
//         {
//           url: `${process.env.baseUrl}/images/about-us.jpg`,
//           height: 569,
//           width: 853,
//         },
//       ],
//     },
//   };
// }

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: AppLocale };
}) {
  // const locale = "en";
  // console.log("DIO CANE", params, rest);
  // const locale = getLocale();

  return (
    <html style={crimsonPro.style}>
      <body>{children}</body>

      {process.env.environment === "production" && (
        <>
          <Script
            async
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.googleAnalyticsId}`}
          />
          <Script id="ga-script" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', '${process.env.googleAnalyticsId}');
                `}
          </Script>
        </>
      )}
    </html>
  );
}
