import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import { Post as PostGraphQL } from "@/types/generated/graphql";
import { AppLocale, Post } from "@/types/global";

import { parseGraphQLNextPost,parseGraphQLPost } from "../parsers/posts";

interface GetPostParams {
  slug: string;
  locale: AppLocale;
  isPreview?: boolean;
}

interface PostQueryResposne {
  postCollection: {
    items: PostGraphQL[];
  };
}

interface GetPostResponse {
  post: Post;
  nextPost?: Pick<Post, "title" | "slug" | "date" | "mainImage" | "smallIntro">;
}

const GET_POST_QUERY = gql`
  query ($slug: String!, $locale: String!, $preview: Boolean!) {
    postCollection(
      where: { slug: $slug }
      preview: $preview
      locale: $locale
      limit: 1
    ) {
      items {
        title
        metaDescription
        slug
        smallIntro
        date
        category
        richtext {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                contentType
                title
                description
                width
                height
                url
              }
            }
          }
        }
        author {
          name
        }
        country {
          name
          slug
          continent {
            name
            slug
          }
        }
        mainImage {
          title
          description
          width
          height
          url
        }
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

export async function getPost({
  slug,
  locale,
  isPreview = false,
}: GetPostParams): Promise<GetPostResponse> {
  try {
    const data = await getApolloServerClient({
      isPreview,
    }).query<PostQueryResposne>({
      query: GET_POST_QUERY,
      variables: { slug, locale, preview: isPreview },
      context: {
        fetchOptions: {
          next: { revalidate: isPreview ? 0 : 3600 },
        },
      },
    });

    const post = data.data.postCollection.items[0];

    return {
      post: parseGraphQLPost(post),
      nextPost: post.nextPost ? parseGraphQLNextPost(post.nextPost) : undefined,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch post");
  }
}
