import {
  CountryCheatsheet,
  CountryCheatsheetCommonPhrase,
  CountryCheatsheetCoworkingSpace,
} from "@/types/global";

function parseCommonPhrases(
  commonPhrases: unknown
): CountryCheatsheetCommonPhrase[] {
  if (!Array.isArray(commonPhrases)) {
    return [];
  }

  return commonPhrases.map((commonPhrase) => ({
    word: commonPhrase.word,
    meaning: commonPhrase.meaning,
  }));
}

function parseCoworkingSpaces(
  coworkingSpaces: unknown
): CountryCheatsheetCoworkingSpace[] {
  if (!Array.isArray(coworkingSpaces)) {
    return [];
  }

  return coworkingSpaces.map((coworkingSpace) => ({
    name: coworkingSpace.name,
    website: coworkingSpace.website,
  }));
}

export function parseCheatsheet(
  cheatsheet: Record<string, unknown>
): CountryCheatsheet | undefined {
  const {
    capital,
    lifeExpetancy,
    population,
    visaWebsite,
    currencies,
    languages,
    dishes,
    commonPhrases,
    coworkingSpaces,
  } = cheatsheet;

  if (
    typeof capital !== "string" ||
    typeof visaWebsite !== "string" ||
    typeof population !== "number" ||
    typeof lifeExpetancy !== "number"
  ) {
    return undefined;
  }

  return {
    capital,
    population,
    visaWebsite,
    lifeExpetancy,
    currencies: Array.isArray(currencies) ? currencies : [],
    languages: Array.isArray(languages) ? languages : [],
    dishes: Array.isArray(dishes) ? dishes : [],
    commonPhrases: parseCommonPhrases(commonPhrases),
    coworkingSpaces: parseCoworkingSpaces(coworkingSpaces),
  };
}
