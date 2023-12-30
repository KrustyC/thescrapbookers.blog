/* eslint-disable */
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type Asset = {
  __typename?: "Asset";
  contentType?: Maybe<Scalars["String"]["output"]>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars["String"]["output"]>;
  fileName?: Maybe<Scalars["String"]["output"]>;
  height?: Maybe<Scalars["Int"]["output"]>;
  size?: Maybe<Scalars["Int"]["output"]>;
  sys: Sys;
  title?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  width?: Maybe<Scalars["Int"]["output"]>;
};

export type AssetCollection = {
  __typename?: "AssetCollection";
  items: Array<Maybe<Asset>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type Author = Entry & {
  __typename?: "Author";
  name?: Maybe<Scalars["String"]["output"]>;
};

export type ContentfulMetadata = {
  __typename?: "ContentfulMetadata";
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulTag = {
  __typename?: "ContentfulTag";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Continent = Entry & {
  __typename?: "Continent";
  mainDescription?: Maybe<Scalars["String"]["output"]>;
  mainImage?: Maybe<Asset>;
  metaDescription?: Maybe<Scalars["String"]["output"]>;
  metaTitle?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
};

export type Country = Entry & {
  __typename?: "Country";
  cheatsheet?: Maybe<Scalars["JSON"]["output"]>;
  continent?: Maybe<Continent>;
  description?: Maybe<Scalars["String"]["output"]>;
  mainImage?: Maybe<Asset>;
  metaDescription?: Maybe<Scalars["String"]["output"]>;
  metaTitle?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  preposition?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  thumbnailImage?: Maybe<Asset>;
};

export type Entry = {
  __typename:
    | "Asset"
    | "Author"
    | "Continent"
    | "Country"
    | "Exhibition"
    | "ExhibitionImage"
    | "Post"
    | "Video";
  contentfulMetadata: ContentfulMetadata;
};

export type Exhibition = Entry & {
  __typename?: "Exhibition";
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<ExhibitionDescription>;
  endDate?: Maybe<Scalars["DateTime"]["output"]>;
  location?: Maybe<Location>;
  locationName?: Maybe<Scalars["String"]["output"]>;
  mainImage?: Maybe<Asset>;
  thumbnailImage?: Maybe<Asset>;
  photos?: Maybe<Array<Maybe<ExhibitionImage>>>;
  startDate?: Maybe<Scalars["DateTime"]["output"]>;
  sys: Sys;
  title?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
};

export type ExhibitionDescriptionArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
};

export type ExhibitionLocationArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
};

export type ExhibitionLocationNameArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
};

export type ExhibitionMainImageArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
};

export type ExhibitionPhotosArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ExhibitionTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
};

export type ExhibitionDescription = {
  __typename?: "ExhibitionDescription";
  json: Scalars["JSON"]["output"];
  links: ExhibitionDescriptionLinks;
};

export type ExhibitionDescriptionAssets = {
  __typename?: "ExhibitionDescriptionAssets";
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ExhibitionDescriptionEntries = {
  __typename?: "ExhibitionDescriptionEntries";
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ExhibitionDescriptionLinks = {
  __typename?: "ExhibitionDescriptionLinks";
  assets: ExhibitionDescriptionAssets;
  entries: ExhibitionDescriptionEntries;
};

export type ExhibitionImage = Entry & {
  __typename?: "ExhibitionImage";
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<ExhibitionImageDescription>;
  photosCollection?: Maybe<AssetCollection>;
  place?: Maybe<Scalars["String"]["output"]>;
  sys: Sys;
  title?: Maybe<Scalars["String"]["output"]>;
  year?: Maybe<Scalars["Int"]["output"]>;
};

export type ExhibitionImageDescriptionArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
};

export type ExhibitionImagePhotosCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ExhibitionImagePlaceArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
};

export type ExhibitionImageTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
};

export type ExhibitionImageYearArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
};

export type ExhibitionImageDescription = {
  __typename?: "ExhibitionImageDescription";
  json: Scalars["JSON"]["output"];
  links: ExhibitionImageDescriptionLinks;
};

export type ExhibitionImageDescriptionAssets = {
  __typename?: "ExhibitionImageDescriptionAssets";
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ExhibitionImageDescriptionEntries = {
  __typename?: "ExhibitionImageDescriptionEntries";
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ExhibitionImageDescriptionLinks = {
  __typename?: "ExhibitionImageDescriptionLinks";
  assets: ExhibitionImageDescriptionAssets;
  entries: ExhibitionImageDescriptionEntries;
};

export type Location = {
  __typename?: "Location";
  lat?: Maybe<Scalars["Float"]["output"]>;
  lon?: Maybe<Scalars["Float"]["output"]>;
};

export type Post = Entry & {
  __typename?: "Post";
  author?: Maybe<Author>;
  category?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Country>;
  date?: Maybe<Scalars["DateTime"]["output"]>;
  mainImage?: Maybe<Asset>;
  metaDescription?: Maybe<Scalars["String"]["output"]>;
  metaTitle?: Maybe<Scalars["String"]["output"]>;
  nextPost?: Maybe<Post>;
  richtext?: Maybe<PostRichtext>;
  slug?: Maybe<Scalars["String"]["output"]>;
  smallIntro?: Maybe<Scalars["String"]["output"]>;
  thumbnailImage?: Maybe<Asset>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type PostRichtext = {
  __typename?: "PostRichtext";
  json: Scalars["JSON"]["output"];
  links: PostRichtextLinks;
};

export type PostRichtextAssets = {
  __typename?: "PostRichtextAssets";
  block: Array<Maybe<Asset>>;
};

export type PostRichtextEntries = {
  __typename?: "PostRichtextEntries";
  block: Array<Maybe<Entry>>;
};

export type PostRichtextLinks = {
  __typename?: "PostRichtextLinks";
  assets: PostRichtextAssets;
  entries: PostRichtextEntries;
};

export type Sys = {
  __typename?: "Sys";
  id: Scalars["String"]["output"];
};

export type Video = Entry & {
  __typename?: "Video";
  contentfulMetadata: ContentfulMetadata;
  name?: Maybe<Scalars["String"]["output"]>;
  sys: Sys;
  video?: Maybe<Scalars["JSON"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
};

export type VideoNameArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
};

export type VideoVideoArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
};
