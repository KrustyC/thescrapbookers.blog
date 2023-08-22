import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import { Post as PostGraphQL } from "@/types/generated/graphql";
import { AppLocale, Post, Tag } from "@/types/global";
import { generatePostHref } from "@/utils/hrefs";
import { extractImageDataFromContentfulAsset } from "@/utils/images";

interface GetPostByTagParams {
  tag: Tag;
  limit?: number;
  locale: AppLocale;
  isPreview?: boolean;
}

type ShortPostGraphQL = Pick<
  PostGraphQL,
  | "slug"
  | "title"
  | "smallIntro"
  | "thumbnailImage"
  | "category"
  | "date"
  | "country"
>;

interface PostByTagQueryResposne {
  postCollection: {
    items: ShortPostGraphQL[];
  };
}

type ShortPost = Pick<
  Post,
  | "slug"
  | "title"
  | "href"
  | "smallIntro"
  | "thumbnailImage"
  | "category"
  | "date"
>;

interface GetPostByTagResponse {
  posts: ShortPost[];
}

const GET_POST__BY_TAG_QUERY = gql`
  query ($tag: String!, $locale: String!, $preview: Boolean!, $limit: Int!) {
    postCollection(
      where: { contentfulMetadata: { tags: { id_contains_all: [$tag] } } }
      preview: $preview
      limit: $limit
      locale: $locale
    ) {
      items {
        slug
        title
        smallIntro
        date
        category
        thumbnailImage {
          title
          description
          width
          height
          url
        }
        country {
          name
          slug
          continent {
            slug
          }
        }
      }
    }
  }
`;

export async function getPostsByTag({
  tag,
  limit = 10,
  locale,
  isPreview = false,
}: GetPostByTagParams): Promise<GetPostByTagResponse> {
  console.log(limit, tag)
  try {
    const data = await getApolloServerClient({
      isPreview,
    }).query<PostByTagQueryResposne>({
      query: GET_POST__BY_TAG_QUERY,
      variables: { tag, limit, locale, preview: isPreview },
      context: {
        fetchOptions: {
          next: {
            revalidate:
              isPreview || process.env.DISABLE_CACHE === "true" ? 0 : 0,
          },
        },
      },
    });

    return {
      posts: data.data.postCollection.items.map((post) => ({
        ...post,
        href: generatePostHref(post.slug, post.country),
        thumbnailImage: extractImageDataFromContentfulAsset(
          post.thumbnailImage
        ),
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch post");
  }
}
