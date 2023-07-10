import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import { AppLocale, Post } from "@/types/global";

interface GetPostsByTagParams {
  tag?: "featured" | "smallnoteHome";
  locale: AppLocale;
}

export async function getPosts({
  tag,
  locale,
}: GetPostsByTagParams): Promise<{ posts: Post[] }> {
  const url = `${process.env.baseUrl}/${locale}/api/post${
    tag ? `?tag=${tag}` : ""
  }`;
  const res = await fetch(
    url,
    process.env.disableCache ? { next: { revalidate: 0 } } : undefined
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getPostDigitalNomadingHighlightedPost({
  locale,
}: {
  locale: AppLocale;
}): Promise<{ post: Post }> {
  const TAG = "digitalNomadingHighlighted";
  const url = `${process.env.baseUrl}/${locale}/api/post?tag=${TAG}`;
  const res = await fetch(
    url,
    process.env.disableCache ? { next: { revalidate: 0 } } : undefined
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { posts } = (await res.json()) as { posts: Post[] };
  return { post: posts[0] };
}

interface GetPostsByCountryParams {
  country: string;
  locale: AppLocale;
}

export async function getPostsByCountry({
  country,
  locale,
}: GetPostsByCountryParams): Promise<{ posts: Post[] }> {
  const url = `${process.env.baseUrl}/${locale}/api/country/${country}/posts`;
  const res = await fetch(
    url,
    process.env.disableCache ? { next: { revalidate: 0 } } : undefined
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface GetPostParams {
  slug: string;
  locale: AppLocale;
  isPreview?: boolean;
}

interface GetPostResponse {
  post: Post;
  nextPost: Pick<Post, "title" | "slug" | "date" | "mainImage" | "smallIntro">;
}

const GET_POST_QUERY = gql`
  query($slug: String, $locale: String, $preview: Boolean) {
    postCollection(
      where: { slug_in: [$slug] }
      preview: $preview
      locale: $locale
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

// bodyRichText {
//   json
//   links {
//     entries {
//       inline {
//         sys {
//           id
//         }
//       }
//     }
//   }
// }

export async function getPost({
  slug,
  locale,
  isPreview = false,
}: GetPostParams): Promise<GetPostResponse> {
  try {
    const data = await getApolloServerClient({
      isPreview,
    }).query<Response>({
      query: GET_POST_QUERY,
      variables: { slug, locale, preview: true },
    });

    return data.data.postCollection.items[0];
  } catch (err) {
    throw new Error("Failed to fetch post");
  }
}
