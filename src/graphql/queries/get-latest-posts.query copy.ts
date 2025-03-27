import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import { Post as PostGraphQL } from "@/types/generated/graphql";
import { AppLocale, ShortPost } from "@/types/global";
import { generatePostHref } from "@/utils/hrefs";
import { extractImageDataFromContentfulAsset } from "@/utils/images";

interface GetLatestPostsParams {
  limit: number;
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



interface LatestPostsgQueryResposne {
  postCollection: {
    items: ShortPostGraphQL[];
  };
}

interface GetLatestPostsResposne {
  posts: ShortPost[];
}

const GET_LATEST_POSTS_QUERY = gql`
  query ($locale: String!, $preview: Boolean!, $limit: Int!) {
    postCollection(
      order: sys_firstPublishedAt_DESC,
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

export async function getLatestPosts({
  limit,
  locale,
  isPreview = false,
}: GetLatestPostsParams): Promise<GetLatestPostsResposne> {
  try {
    const data = await getApolloServerClient({
      isPreview,
    }).query<LatestPostsgQueryResposne>({
      query: GET_LATEST_POSTS_QUERY,
      variables: { limit, locale, preview: isPreview },
      context: {
        fetchOptions: {
          next: {
            revalidate:
              isPreview || process.env.DISABLE_CACHE === "true" ? 0 : 3600,
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
