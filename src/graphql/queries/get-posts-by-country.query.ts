import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import { Post as PostGraphQL } from "@/types/generated/graphql";
import { AppLocale, Country, Post } from "@/types/global";
import { generatePostHref } from "@/utils/hrefs";
import { extractImageDataFromContentfulAsset } from "@/utils/images";

export type GraphQLCountryPost = Pick<
  PostGraphQL,
  "slug" | "title" | "smallIntro" | "thumbnailImage" | "category" | "date"
>;

export type CountryPost = Pick<
  Post,
  | "slug"
  | "title"
  | "href"
  | "smallIntro"
  | "thumbnailImage"
  | "category"
  | "date"
>;

const GET_POSTS_BY_COUNTRY_QUERY = gql`
  query ($countrySlug: String!, $locale: String!, $preview: Boolean!) {
    postCollection(
      where: { country: { slug: $countrySlug } }
      preview: $preview
      locale: $locale
    ) {
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
`;

interface GetPostParams {
  country: Required<Pick<Country, "slug" | "name" | "continent">>;
  locale: AppLocale;
  isPreview?: boolean;
}

interface PostsByCountryGraphQLQueryResposne {
  postCollection: {
    items: GraphQLCountryPost[];
  };
}

interface GetPostByCountryResponse {
  posts: CountryPost[];
}

export async function getPostsByCountry({
  country,
  locale,
  isPreview = false,
}: GetPostParams): Promise<GetPostByCountryResponse> {
  try {
    const data = await getApolloServerClient({
      isPreview,
    }).query<PostsByCountryGraphQLQueryResposne>({
      query: GET_POSTS_BY_COUNTRY_QUERY,
      variables: { countrySlug: country.slug, locale, preview: isPreview },
    });

    return {
      posts: data.data.postCollection.items.map((graphQLPost) => ({
        ...graphQLPost,
        href: generatePostHref(graphQLPost.slug, country),
        thumbnailImage: extractImageDataFromContentfulAsset(
          graphQLPost.thumbnailImage
        ),
      })),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post");
  }
}
