import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import { Country as CountryGraphQL } from "@/types/generated/graphql";
import {
  AppLocale,
  Country,
  CountryCheatsheet,
  CountryCheatsheetCoworkingSpace,
} from "@/types/global";
import { extractImageDataFromContentfulAsset } from "@/utils/images";

interface GetCountryParams {
  slug: string;
  locale: AppLocale;
  isPreview?: boolean;
}

interface CountryQueryResposne {
  countryCollection: {
    items: CountryGraphQL[];
  };
}

interface GetCountryResponse {
  country: Country;
}

const GET_COUNTRY_QUERY = gql`
  query ($slug: String!, $locale: String!, $preview: Boolean!) {
    countryCollection(
      where: { slug: $slug }
      preview: $preview
      locale: $locale
      limit: 1
    ) {
      items {
        name
        slug
        metaDescription
        continent {
          name
          slug
        }
        cheatsheet
        mainImage {
          title
          description
          width
          height
          url
        }
      }
    }
  }
`;

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

function parseCheatsheet(
  cheatsheet: Record<string, unknown>
): CountryCheatsheet | undefined {
  const {
    language,
    capital,
    mainReligions,
    currency,
    population,
    area,
    basicWords,
    dishes,
    visaWebsite,
    faveCoworkingSpace,
  } = cheatsheet;

  if (
    typeof language !== "string" ||
    typeof capital !== "string" ||
    typeof currency !== "string" ||
    typeof visaWebsite !== "string"
  ) {
    return undefined;
  }

  if (typeof area !== "number" || typeof population !== "number") {
    return undefined;
  }

  return {
    language,
    capital,
    currency,
    population,
    area,
    visaWebsite,
    mainReligions: Array.isArray(mainReligions) ? mainReligions : [],
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

export async function getCountry({
  slug,
  locale,
  isPreview = false,
}: GetCountryParams): Promise<GetCountryResponse> {
  try {
    const data = await getApolloServerClient({
      isPreview,
    }).query<CountryQueryResposne>({
      query: GET_COUNTRY_QUERY,
      variables: { slug, locale, preview: isPreview },
    });

    const country = data.data.countryCollection.items[0];

    return {
      country: {
        name: country.name,
        slug: country.slug,
        cheatsheet: country.cheatsheet
          ? parseCheatsheet(country.cheatsheet)
          : undefined,
        metaDescription: country.metaDescription,
        continent: country.continent,
        mainImage: extractImageDataFromContentfulAsset(country.mainImage),
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch country with slug: ${slug}`);
  }
}
