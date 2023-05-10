import { Document } from "@contentful/rich-text-types";

export type AppLocale = "en" | "it";

export interface Continent {
  name: string;
  slug: string;
  mainImage?: Image;
  description: string;
  metaDescription?: string;
}

export interface Country {
  name: string;
  slug: string;
  mainImage?: Image;
  description?: string;
  metaDescription?: string;
  continent: Pick<Continent, "name" | "slug">;
}

export interface Author {
  name: string;
}

export interface Image {
  url: string;
  description: string;
  details: {
    height?: number;
    width?: number;
  };
}

export interface Post {
  title: string;
  slug: string;
  smallIntro: string;
  thumbnailImage?: Image;
  mainImage: Image;
  category: string;
  richtext: Document;
  date: Date;
  href: string;
  author: Author;
  country?: Pick<Country, "name" | "slug" | "continent">;
}
