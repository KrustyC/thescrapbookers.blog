import { gql } from "@apollo/client";
import { getApolloServerClient } from "src/graphql/apollo-server-client";

import { Exhibition as ExhibitionGraphQL } from "@/types/generated/graphql";
import { AppLocale, Exhibition } from "@/types/global";

import { parseGraphQLExhibition } from "../parsers/exhibitions";

interface GetExhibitionParams {
  slug: string;
  locale: AppLocale;
  isPreview?: boolean;
}

interface ExhibitionQueryResposne {
  exhibitionCollection: {
    items: ExhibitionGraphQL[];
  };
}

interface GetExhibitionResponse {
  exhibition: Exhibition;
}

const GET_EXHIBITION_QUERY = gql`
  query ($slug: String!, $locale: String!, $preview: Boolean!) {
    exhibitionCollection(
      where: { slug: $slug }
      preview: $preview
      locale: $locale
      limit: 1
    ) {
      items {
        title
        slug
        startDate
        endDate
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

export async function getExhibition({
  slug,
  locale,
  isPreview = false,
}: GetExhibitionParams): Promise<GetExhibitionResponse> {
  try {
    const data = await getApolloServerClient({
      isPreview,
    }).query<ExhibitionQueryResposne>({
      query: GET_EXHIBITION_QUERY,
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

    const exhibition = data.data.exhibitionCollection.items[0];

    return {
      exhibition: parseGraphQLExhibition(exhibition),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch exhibition");
  }
}
