import { Asset, EntryFieldType, EntryFieldTypes } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface AuthorSkelton {
  contentTypeId: "author";
  fields: {
    name: string;
  };
}

export type PostDate = `${number}-${number}-${number}T${number}:${number}:${number}Z`

export interface PostSkeleton {
  contentTypeId: "post";
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    smallIntro: EntryFieldTypes.Text;
    mainImage: Asset;
    thumbnailImage: Asset;
    category: EntryFieldTypes.Text;
    richtext: Document;
    date: EntryFieldTypes.Date;
    nextPost: { fields: Omit<PostSkeleton, "nextPost"> };
    author: AuthorSkelton;
  };
}
