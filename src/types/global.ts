import { Document } from "@contentful/rich-text-types";

export type AppLocale = "en" | "it";

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
  author: Author;
}
