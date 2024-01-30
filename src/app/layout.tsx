import { ReactNode } from "react";
import { Metadata } from "next";

import "../globals.css";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "The Scrapbookers",
  metadataBase: new URL("https://thescrapbookers.blog"),
  alternates: {
    canonical: "/",
    languages: {
      // en: "/en",
      it: "/it",
    },
  },
  openGraph: {
    title: "The Scrapbookers",
    siteName: "The Scrapbookers",
    url: new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/the_scrapbookers.webp`,
        height: 569,
        width: 853,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    shortcut: { url: "/icons/favicon-48x48.png", type: "image/png" },
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
};

/**
 *  Even though this component is just passing its children through, the presence
 *  of this file fixes an issue in Next.js 13.4 where link clicks that switch
 *  the locale would otherwise cause a full reload.
 */
export default function RootLayout({ children }: Props) {
  return children;
}
