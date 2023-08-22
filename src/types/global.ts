import { Document } from "@contentful/rich-text-types";

export enum Tag {
  DIGITAL_NOMADING_HIGHLIGHTED = "digitalNomadingHighlighted",
  DIGITAL_NOMADING = "digitalNomading",
  RELIGION = "religion",
  LIFESTYLE = "lifestyle",
  NATURE = "nature",
  FEATUERED = "featured",
}

export type AppLocale = "en" | "it";

export interface Continent {
  name?: string;
  slug?: string;
  mainImage?: Image;
  mainDescription?: string;
  metaDescription?: string;
  metaTitle?: string;
}

export interface CountryCheatsheetBasicWord {
  word: string;
  meaning: string;
}

export interface CountryCheatsheetCoworkingSpace {
  name: string;
  website: string;
}

export interface CountryCheatsheet {
  language: string;
  capital: string;
  currency: string;
  population: number;
  basicWords: CountryCheatsheetBasicWord[];
  dishes: string[];
  visaWebsite: string;
  faveCoworkingSpace?: CountryCheatsheetCoworkingSpace;
}

export interface Country {
  name?: string;
  slug?: string;
  metaTitle?: string;
  mainImage?: Image;
  thumbnailImage?: Image;
  description?: string;
  metaDescription?: string;
  cheatsheet?: CountryCheatsheet;
  continent?: Pick<Continent, "name" | "slug">;
}

export interface ShortCountry
  extends Pick<
    Country,
    "name" | "slug" | "description" | "thumbnailImage" | "continent"
  > {}

export interface Author {
  name?: string;
}

export interface Image {
  url?: string;
  title?: string;
  description?: string;
  details: {
    height?: number;
    width?: number;
  };
}

export interface RichTextAsset {
  id: string;
  title?: string;
  description?: string;
  contentType?: string;
  width?: number;
  height?: number;
  url?: string;
}

export interface RichText {
  json?: Document;
  assets?: Array<RichTextAsset | undefined>;
}

export interface Post {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  smallIntro?: string;
  thumbnailImage?: Image;
  mainImage?: Image;
  category?: string;
  richtext: RichText;
  date?: Date;
  href?: string;
  timeToRead?: number;
  author?: Author;
  country?: Pick<Country, "name" | "slug" | "continent">;
}
