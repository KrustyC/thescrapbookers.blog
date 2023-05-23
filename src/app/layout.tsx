import { ReactNode } from "react";
import { Metadata } from "next";

import "../globals.css";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  icons: {
    icon: {
      url: "/favicon.ico",
      type: "image/png",
    },
    shortcut: { url: "/favicon.png", type: "image/png" },
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
