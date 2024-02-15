import { Document } from "@contentful/rich-text-types";

import {
  Exhibition as ExhibitionGraphQL,
  ExhibitionImage as ExhibitionImageGraphQL,
} from "@/types/generated/graphql";
import { Exhibition, ExhibitionImage, RichTextAsset } from "@/types/global";
import { generateExhibitionHref } from "@/utils/hrefs";
import { extractImageDataFromContentfulAsset } from "@/utils/images";

function parseExhibitionImage(
  graphQLExhibitionImage: ExhibitionImageGraphQL | undefined
): ExhibitionImage | undefined {
  if (!graphQLExhibitionImage) {
    return undefined;
  }

  return {
    title: graphQLExhibitionImage.title,
    description: {
      json: graphQLExhibitionImage.description?.json as unknown as Document,
    },
    // photos: graphQLExhibitionImage.photosCollection.items.map(() => undefined)),
    photos: [],
    year: graphQLExhibitionImage.year,
    place: graphQLExhibitionImage.place,
  };
}

export function parseGraphQLExhibition(
  graphQLExhibition: ExhibitionGraphQL
): Exhibition {
  const mainImage = graphQLExhibition.mainImage
    ? extractImageDataFromContentfulAsset(graphQLExhibition.mainImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;

  const thumbnailImage = graphQLExhibition.thumbnailImage
    ? extractImageDataFromContentfulAsset(
        graphQLExhibition.thumbnailImage as any
      )
    : undefined;

  return {
    ...graphQLExhibition,
    mainImage: mainImage,
    thumbnailImage: thumbnailImage,
    description: {
      json: graphQLExhibition.description?.json as unknown as Document,
    },
    photos: (graphQLExhibition.photos
      ?.map(parseExhibitionImage)
      .filter((image) => image !== undefined) || []) as ExhibitionImage[],
    href: graphQLExhibition.slug
      ? generateExhibitionHref(graphQLExhibition.slug)
      : undefined,
  };
}
