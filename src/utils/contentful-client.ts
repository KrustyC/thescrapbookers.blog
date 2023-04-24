import { createClient, type ContentfulClientApi } from "contentful";

let cachedClient: ContentfulClientApi<undefined> | undefined;

export function getContentfulClient(): ContentfulClientApi<undefined> {
  if (!cachedClient) {
    cachedClient = createClient({
      space: process.env.CONTENTFUL_SPACE_ID as string,
      accessToken: (process.env.IS_PREVIEW === "true"
        ? process.env.CONTENTFUL_PREVIEW_TOKEN
        : process.env.CONTENTFUL_DELIVERY_TOKEN) as string,
    });
  }

  return cachedClient;
}
