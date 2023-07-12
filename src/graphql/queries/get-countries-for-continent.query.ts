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

/**
 * This is a small hack to quickly sort countries according to the order I prefer.
 * in the future it may be done directly on the API, or Contentful.
 */
const COUNTRY_ORDERED_SLUGS = ["thailand", "laos", "vietnam", "cambodia"];

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
          next: { revalidate: isPreview ? 0 : 3600 },
        },
      },
    });

    const countries = data.data.countryCollection.items;

    // Filter out countries that don't have a slug
    const filteredCountries = countries.filter(country => !!country.slug)
    filteredCountries.sort((a, b) => {
      if (!a.slug || !b.slug) return 0;

      return (
        COUNTRY_ORDERED_SLUGS.indexOf(a.slug) -
        COUNTRY_ORDERED_SLUGS.indexOf(b.slug)
      );
    });

    return {
      countries: filteredCountries,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to fetch countries for continent with slug: ${continentSlug}`
    );
  }
}
