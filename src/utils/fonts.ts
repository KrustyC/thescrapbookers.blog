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
