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
    phrase: commonPhrase.phrase,
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
    reason: coworkingSpace.reason,
  }));
}

export function parseCheatsheet(
  cheatsheet: Record<string, unknown>
): CountryCheatsheet | undefined {
  const {
    capital,
    lifeExpectancy,
    population,
    visaWebsite,
    currencies,
    languages,
    dishes,
    // preposition,
    commonPhrases,
    coworkingSpaces,
  } = cheatsheet;

  if (
    typeof capital !== "string" ||
    typeof visaWebsite !== "string" ||
    typeof population !== "number" ||
    typeof lifeExpectancy !== "number"
  ) {
    return undefined;
  }

  return {
    capital,
    population,
    visaWebsite,
    lifeExpectancy,
    currencies: Array.isArray(currencies) ? currencies : [],
    languages: Array.isArray(languages) ? languages : [],
    dishes: Array.isArray(dishes) ? dishes : [],
    commonPhrases: parseCommonPhrases(commonPhrases),
    coworkingSpaces: parseCoworkingSpaces(coworkingSpaces),
  };
}
