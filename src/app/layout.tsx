import Script from "next/script";
import { WebsiteUnderConstruction } from "components/WebsiteUnderConstrution/WebsiteUnderConstruction";
import { crimsonPro } from "utils/fonts";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s | The Scrapbookers",
    default: "The Scrapbookers",
  },
  description: "Travel Blog of The Scrapbookers",
  generator: "Next.js",
  keywords: ["Travel", "South East Asia", "Blog", "Food and travel"],
  authors: [
    { name: "Davide Crestini", url: "https://dcrestini.me" },
    { name: "Beatrice Cox", url: "https://beatricecox.com" },
  ],
  creator: "Davide Crestini",
  publisher: "Beatrice Cox",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    other: [
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Scrapbookers",
    description:
      "Travel couple, currently travelling through South East Asia. We want to bring a new perspective about the places we visit, as well as some interesting stories.",
    // siteId: '1467726470533754880',
    // creator: '@nextjs',
    // creatorId: '1467726470533754880',
    // images: ['https://nextjs.org/og.png'],
  },
  openGraph: {
    type: "website",
    url: "https://thescrapbookers.blog",
    title: "The Scrapbookers",
    description:
      "Travel couple, currently travelling through South East Asia. We want to bring a new perspective about the places we visit, as well as some interesting stories.",
    siteName: "The Scrapbookers",
    images: [
      {
        url: "https://thescrapbookers.blog/images/home-hero.jpg",
      },
    ],
  },
};

const WEBSITE_IS_ACTIVE = process.env.WEBSITE_IS_ACTIVE === "true" || false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={crimsonPro.style}>
      <body className={!WEBSITE_IS_ACTIVE ? "bg-orange-100" : ""}>
        {WEBSITE_IS_ACTIVE ? children : <WebsiteUnderConstruction />}
      </body>

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
