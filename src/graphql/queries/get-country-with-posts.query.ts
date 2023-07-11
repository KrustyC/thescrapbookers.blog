import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import {
  Country as CountryGraphQL,
  Post as PostGraphQL,
} from "@/types/generated/graphql";
import { AppLocale, Country, Post } from "@/types/global";
import { generatePostHref } from "@/utils/hrefs";
import { extractImageDataFromContentfulAsset } from "@/utils/images";

import { parseCheatsheet } from "../parsers/countries";

type LinkedPostGraphQL = Pick<
  PostGraphQL,
  "slug" | "title" | "smallIntro" | "thumbnailImage" | "category" | "date"
>;

type CountryWithPostsGraphQL = Pick<
  CountryGraphQL,
  "name" | "slug" | "metaDescription" | "continent" | "cheatsheet" | "mainImage"
> & {
  linkedFrom: {
    postCollection: {
      items: LinkedPostGraphQL[];
    };
  };
};

interface GetCountryParams {
  slug: string;
  locale: AppLocale;
  isPreview?: boolean;
}

interface CountryQueryResposne {
  countryCollection: {
    items: CountryWithPostsGraphQL[];
  };
}

type CountryPost = Pick<
  Post,
  | "slug"
  | "title"
  | "href"
  | "smallIntro"
  | "thumbnailImage"
  | "category"
  | "date"
>;

interface GetCountryResponse {
  country: Country & {
    posts: CountryPost[];
  };
}

const GET_COUNTRY_WITH_POSTS_QUERY = gql`
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
        linkedFrom(allowedLocales: ["it", "en"]) {
          postCollection(locale: $locale) {
            items {
              slug
              title
              smallIntro
              category
              date
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

export async function getCountryWithPosts({
  slug,
  locale,
  isPreview = false,
}: GetCountryParams): Promise<GetCountryResponse> {
  try {
    const data = await getApolloServerClient({
      isPreview,
    }).query<CountryQueryResposne>({
      query: GET_COUNTRY_WITH_POSTS_QUERY,
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
        posts: country.linkedFrom.postCollection.items.map((post) => ({
          ...post,
          href: generatePostHref(post.slug, country),
          thumbnailImage: extractImageDataFromContentfulAsset(
            post.thumbnailImage
          ),
        })),
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch country with slug: ${slug}`);
  }
}
