import {
  League_Gothic,
  Merriweather,
  Oooh_Baby,
  Poppins,
} from "next/font/google";

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
  variable: "--font-merriweather",
  adjustFontFallback: false,
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  adjustFontFallback: false,
});

export const ooohBaby = Oooh_Baby({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oooh-baby",
  adjustFontFallback: false,
});

export const leagueGothic = League_Gothic({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-league-gothic",
  adjustFontFallback: false,
});
