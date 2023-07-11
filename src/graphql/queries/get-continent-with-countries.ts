import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import { AppLocale, Continent, ShortCountry } from "@/types/global";
import { extractImageDataFromContentfulAsset } from "@/utils/images";
import {
  Country as CountryGraphQL,
  Continent as ContinentGraphQL,
} from "@/types/generated/graphql";

type LinkedCountryGraphQL = Pick<
  CountryGraphQL,
  "name" | "slug" | "shortDescription" | "thumbnailImage"
>;

type ContinentWithCountriesGraphQL = Pick<
  ContinentGraphQL,
  "name" | "slug" | "mainDescription" | "metaDescription" | "mainImage"
> & {
  linkedFrom: {
    countryCollection: {
      items: LinkedCountryGraphQL[];
    };
  };
};

interface GetContinentWithCountriesParams {
  slug: string;
  locale: AppLocale;
  isPreview?: boolean;
}

interface ContinentWithCountriesQueryResponse {
  continentCollection: {
    items: ContinentWithCountriesGraphQL[];
  };
}

interface GetContinent {
  continent: Continent & {
    countries: ShortCountry[];
  };
}

const GET_CONTINENT_WITH_COUNTRIES = gql`
  query ($slug: String!, $locale: String!, $preview: Boolean!) {
    continentCollection(
      where: { slug: $slug }
      preview: $preview
      locale: $locale
      limit: 1
    ) {
      items {
        slug
        name
        mainDescription
        metaDescription
        mainImage {
          title
          description
          width
          height
          url
        }
        linkedFrom(allowedLocales: ["it", "en"]) {
          countryCollection(locale: $locale) {
            items {
              name
              slug
              shortDescription
              thumbnailImage {
                title
                description
                width
                height
                url
              }
            }
          }
        }
      }
    }
  }
`;

export async function getContinentWithCountries({
  slug,
  locale,
  isPreview = false,
}: GetContinentWithCountriesParams): Promise<GetContinent> {
  try {
    const data = await getApolloServerClient({
      isPreview,
    }).query<ContinentWithCountriesQueryResponse>({
      query: GET_CONTINENT_WITH_COUNTRIES,
      variables: { slug, locale, preview: isPreview },
    });

    const continent = data.data.continentCollection.items[0];

    return {
      continent: {
        name: continent.name,
        slug: continent.slug,
        metaDescription: continent.metaDescription,
        mainDescription: continent.mainDescription,
        mainImage: extractImageDataFromContentfulAsset(continent.mainImage),
        countries: continent.linkedFrom.countryCollection.items.map(
          (country) => ({
            name: country.name,
            slug: country.slug,
            shortDescription: country.shortDescription,
            thumbnailImage: extractImageDataFromContentfulAsset(
              country.thumbnailImage
            ),
          })
        ),
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch continent with slug: ${slug}`);
  }
}
