import {
  CountryCheatsheet,
  CountryCheatsheetCoworkingSpace,
} from "@/types/global";

function checkCoworkingSpace(
  coworkingSpace: unknown
): coworkingSpace is CountryCheatsheetCoworkingSpace {
  if (typeof coworkingSpace !== "object" || coworkingSpace === null) {
    return false;
  }

  if (
    !coworkingSpace.hasOwnProperty("name") ||
    !coworkingSpace.hasOwnProperty("website")
  ) {
    return false;
  }

  return true;
}

export function parseCheatsheet(
  cheatsheet: Record<string, unknown>
): CountryCheatsheet | undefined {
  const {
    language,
    capital,
    currency,
    population,
    basicWords,
    dishes,
    visaWebsite,
    faveCoworkingSpace,
  } = cheatsheet;

  if (
    typeof language !== "string" ||
    typeof capital !== "string" ||
    typeof currency !== "string" ||
    typeof visaWebsite !== "string" ||
    typeof population !== "number"
  ) {
    return undefined;
  }

  return {
    language,
    capital,
    currency,
    population,
    visaWebsite,
    basicWords: Array.isArray(basicWords)
      ? basicWords?.map((basicWord) => ({
          word: basicWord.word,
          meaning: basicWord.meaning,
        }))
      : [],
    dishes: Array.isArray(dishes) ? dishes : [],
    faveCoworkingSpace: checkCoworkingSpace(faveCoworkingSpace)
      ? faveCoworkingSpace
      : undefined,
  };
}
