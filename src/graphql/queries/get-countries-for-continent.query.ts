import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import { Country as CountryGraphQL } from "@/types/generated/graphql";
import { AppLocale, Country } from "@/types/global";
import { COUNTRY_ORDERED_SLUGS } from "@/utils/constants";
import { sortItemsWithSlug } from "@/utils/item-with-slug-sorter";

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
      context: {
        fetchOptions: {
          next: {
            revalidate:
              isPreview || process.env.DISABLE_CACHE === "true" ? 0 : 3600,
          },
        },
      },
    });

    const countries = data.data.countryCollection.items;
    return {
      countries: sortItemsWithSlug(countries, COUNTRY_ORDERED_SLUGS),
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to fetch countries for continent with slug: ${continentSlug}`
    );
  }
}
