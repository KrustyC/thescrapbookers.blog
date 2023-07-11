import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import { Country as CountryGraphQL } from "@/types/generated/graphql";
import { AppLocale, Country } from "@/types/global";

const GET_COUNTRIES_FOR_CONTINENT = gql`
  query ($continentSlug: String!, $locale: String!, $preview: Boolean!) {
    countryCollection(
      where: { continent: { slug: $continentSlug } }
      preview: $preview
      locale: $locale
    ) {
      items {
        name
        slug
      }
    }
  }
`;

interface GetCountryForContinentParams {
  continentSlug: string;
  locale: AppLocale;
  isPreview?: boolean;
}

interface CountryForContinentQueryResposne {
  countryCollection: {
    items: Array<Pick<CountryGraphQL, "name" | "slug">>;
  };
}

interface GetCountriesForContinentResponse {
  countries: Array<Pick<Country, "name" | "slug">>;
}

export async function getCountriesForContinent({
  continentSlug,
  locale,
  isPreview = false,
}: GetCountryForContinentParams): Promise<GetCountriesForContinentResponse> {
  try {
    const data = await getApolloServerClient({
      isPreview,
    }).query<CountryForContinentQueryResposne>({
      query: GET_COUNTRIES_FOR_CONTINENT,
      variables: { continentSlug, locale, preview: isPreview },
    });

    return {
      countries: data.data.countryCollection.items,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to fetch countries for continent with slug: ${continentSlug}`
    );
  }
}
