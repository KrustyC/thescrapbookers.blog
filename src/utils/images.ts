import type { Asset, AssetFields, AssetFile } from "contentful";

import type { Image } from "@/types/global";

function fileIsAssetFile(file: AssetFields | AssetFile): file is AssetFile {
  return Object.keys(file).includes("details");
}

function getDescription(description: string | AssetFields | undefined): string {
  if (typeof description === "string") {
    return description;
  }

  return "an image";
}

export function extractImageDataFromContentfulAsset(
  contentfulAsset: Asset
): Image | undefined {
  if (
    !contentfulAsset.fields?.file ||
    (contentfulAsset.fields.file &&
      !fileIsAssetFile(contentfulAsset.fields.file))
  ) {
    return undefined;
  }

  return {
    url: `https:${contentfulAsset.fields.file.url}`,
    description: getDescription(contentfulAsset.fields.description),
    details: {
      height: contentfulAsset.fields.file.details.image?.height,
      width: contentfulAsset.fields.file.details.image?.width,
    },
  };
}
