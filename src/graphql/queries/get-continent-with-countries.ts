import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import {
  Continent as ContinentGraphQL,
  Country as CountryGraphQL,
} from "@/types/generated/graphql";
import { AppLocale, Continent, ShortCountry } from "@/types/global";
import { COUNTRY_ORDERED_SLUGS } from "@/utils/constants";
import { extractImageDataFromContentfulAsset } from "@/utils/images";
import { sortItemsWithSlug } from "@/utils/item-with-slug-sorter";

type LinkedCountryGraphQL = Pick<
  CountryGraphQL,
  "name" | "slug" | "description" | "thumbnailImage"
>;

type ContinentWithCountriesGraphQL = Pick<
  ContinentGraphQL,
  | "name"
  | "slug"
  | "mainDescription"
  | "metaDescription"
  | "metaTitle"
  | "mainImage"
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
        metaTitle
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
              description
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
      context: {
        fetchOptions: {
          next: {
            revalidate:
              isPreview || process.env.DISABLE_CACHE === "true" ? 0 : 3600,
          },
        },
      },
    });

    if (!data.data) {
      throw new Error(`Continent with slug: ${slug} not found`);
    }

    const continent = data.data.continentCollection.items[0];

    const countries = continent.linkedFrom.countryCollection.items.map(
      (country) => ({
        name: country.name,
        slug: country.slug,
        description: country.description,
        thumbnailImage: extractImageDataFromContentfulAsset(
          country.thumbnailImage
        ),
      })
    );

    return {
      continent: {
        name: continent.name,
        slug: continent.slug,
        metaDescription: continent.metaDescription,
        metaTitle: continent.metaTitle,
        mainDescription: continent.mainDescription,
        mainImage: extractImageDataFromContentfulAsset(continent.mainImage),
        countries: sortItemsWithSlug(countries, COUNTRY_ORDERED_SLUGS),
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch continent with slug: ${slug}`);
  }
}
