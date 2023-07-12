import {
  Cormorant_Garamond,
  League_Gothic,
  Oooh_Baby,
  Poppins,
} from "next/font/google";

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const ooohBaby = Oooh_Baby({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const leagueGothic = League_Gothic({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
