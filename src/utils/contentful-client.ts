import { type ContentfulClientApi, createClient } from "contentful";

let cachedClient: ContentfulClientApi<undefined> | undefined;

export function getContentfulClient(): ContentfulClientApi<undefined> {
  // if (!cachedClient) {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });
  // }

  // return cachedClient;
}
