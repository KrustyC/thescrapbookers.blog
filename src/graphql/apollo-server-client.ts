import { HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { AppLocale } from "@/types/global";

const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

interface GetApolloServerClientOptions {
  isPreview?: boolean;
  locale?: AppLocale;
}

export function getApolloServerClient(
  options: GetApolloServerClientOptions = {}
) {
  const { isPreview = false } = options;

  const token = isPreview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  console.log(isPreview, token);

  const { getClient } = registerApolloClient(() => {
    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link: new HttpLink({
        uri: GRAPHQL_ENDPOINT,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    });
  });

  return getClient();
}
