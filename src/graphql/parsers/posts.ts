import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";

import {
  Asset as AssetGraphQL,
  Country as CountryGraphQL,
  Post as PostGraphQL,
} from "@/types/generated/graphql";
import { Country, Post, RichTextAsset } from "@/types/global";
import { timeToRead } from "@/utils/content";
import { generatePostHref } from "@/utils/hrefs";
import { extractImageDataFromContentfulAsset } from "@/utils/images";

function parseContentfulCountry(
  country: CountryGraphQL
): Pick<Country, "name" | "slug" | "continent"> {
  const continent = country.continent;

  return {
    name: country.name,
    slug: country.slug,
    continent: {
      name: continent?.name,
      slug: continent?.slug,
    },
  };
}

function parseLinkToAsset(
  graphQLLink: AssetGraphQL | undefined
): RichTextAsset | undefined {
  if (!graphQLLink) {
    return undefined;
  }

  return {
    title: graphQLLink.title,
    id: graphQLLink.sys.id,
    description: graphQLLink.description,
    contentType: graphQLLink.contentType,
    width: graphQLLink.width,
    height: graphQLLink.height,
    url: graphQLLink.url,
  };
}

export function parseGraphQLPost(graphQLPost: PostGraphQL): Post {
  const mainImage = graphQLPost.mainImage
    ? extractImageDataFromContentfulAsset(graphQLPost.mainImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;

  const thumbnailImage = graphQLPost.thumbnailImage
    ? extractImageDataFromContentfulAsset(graphQLPost.thumbnailImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;

  const plainTextString = graphQLPost.richtext
    ? documentToPlainTextString(graphQLPost.richtext.json)
    : "";

  return {
    ...graphQLPost,
    richtext: {
      json: graphQLPost.richtext?.json as unknown as Document,
      assets: graphQLPost.richtext?.links.assets.block
        .filter((asset) => !!asset)
        .map(parseLinkToAsset),
    },
    timeToRead: timeToRead(plainTextString),
    href: graphQLPost.slug
      ? generatePostHref(graphQLPost.slug, graphQLPost.country)
      : undefined,
    mainImage: mainImage,
    thumbnailImage: thumbnailImage,
  };
}

interface NextPost
  extends Pick<
    Post,
    "title" | "slug" | "mainImage" | "date" | "smallIntro" | "href"
  > {}

export function parseGraphQLNextPost(nextPost: PostGraphQL): NextPost {
  const mainImage = nextPost.mainImage
    ? extractImageDataFromContentfulAsset(nextPost.mainImage)
    : undefined;

  const country = nextPost.country
    ? parseContentfulCountry(nextPost.country)
    : undefined;

  return {
    title: nextPost.title,
    slug: nextPost.slug,
    smallIntro: nextPost.smallIntro,
    date: nextPost.date,
    href: nextPost.slug ? generatePostHref(nextPost.slug, country) : undefined,
    mainImage,
  };
}
