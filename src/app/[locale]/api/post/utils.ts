import type { Country, Post } from "types/global";
import type {
  AuthorSkelton,
  ContinentSkeleton,
  CountrySkeleton,
  PostSkeleton,
} from "types/contentful";
import { extractImageDataFromContentfulAsset } from "utils/images";
import { Entry } from "contentful";

function generatePostHref(slug: string, country: Country | undefined) {
  if (!country) {
    return `/generic/${slug}`;
  }

  return `/${country.continent.slug}/${country.slug}/${slug}`;
}

function parseContentfulCountry(
  country: Entry<CountrySkeleton>
): Pick<Country, "name" | "slug" | "continent"> {
  const continent = country.fields.continent as unknown as ContinentSkeleton;

  return {
    name: country.fields.name as unknown as string,
    slug: country.fields.slug as unknown as string,
    continent: {
      name: continent.fields.name as unknown as string,
      slug: continent.fields.slug as unknown as string,
    },
  };
}

export function parseContentfulPostFieldsForList(
  post: Entry<PostSkeleton>
): Pick<
  Post,
  | "title"
  | "slug"
  | "href"
  | "date"
  | "smallIntro"
  | "thumbnailImage"
  | "category"
  | "country"
> | null {
  const { fields } = post;

  if (
    typeof fields.title !== "string" ||
    typeof fields.slug !== "string" ||
    typeof fields.smallIntro !== "string" ||
    typeof fields.category !== "string" ||
    typeof fields.date !== "string"
  ) {
    return null;
  }

  const country = fields.country
    ? parseContentfulCountry(
        fields.country as unknown as Entry<CountrySkeleton>
      )
    : undefined;

  return {
    title: fields.title,
    slug: fields.slug,
    smallIntro: fields.smallIntro,
    href: generatePostHref(fields.slug, country),
    date: new Date(fields.date),
    category: fields.category,
    thumbnailImage: fields.thumbnailImage
      ? extractImageDataFromContentfulAsset(fields.thumbnailImage)
      : undefined,
    country,
  };
}

export function parseContentfulPostFieldsForSinglePost(
  post: Entry<PostSkeleton>
): Post | null {
  const { fields } = post;

  const mainImage = fields.mainImage
    ? extractImageDataFromContentfulAsset(fields.mainImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;

  if (
    typeof fields.title !== "string" ||
    typeof fields.slug !== "string" ||
    typeof fields.smallIntro !== "string" ||
    typeof fields.category !== "string" ||
    typeof fields.date !== "string" ||
    !mainImage
  ) {
    return null;
  }

  const country = fields.country
    ? parseContentfulCountry(
        fields.country as unknown as Entry<CountrySkeleton>
      )
    : undefined;

  return {
    title: fields.title,
    slug: fields.slug,
    smallIntro: fields.smallIntro,
    date: new Date(fields.date),
    category: fields.category,
    richtext: fields.richtext,
    thumbnailImage: fields.thumbnailImage
      ? extractImageDataFromContentfulAsset(fields.thumbnailImage)
      : undefined,
    mainImage,
    author: {
      name: (fields.author as AuthorSkelton).fields.name,
    },
    href: generatePostHref(fields.slug, country),
    country: fields.country
      ? parseContentfulCountry(
          fields.country as unknown as Entry<CountrySkeleton>
        )
      : undefined,
  };
}

interface NextPost
  extends Pick<
    Post,
    "title" | "slug" | "mainImage" | "date" | "smallIntro" | "href"
  > {}

export function parseContentfulNextPostFields(
  fields: Omit<PostSkeleton["fields"], "nextPost">
): NextPost | null {
  const mainImage = extractImageDataFromContentfulAsset(fields.mainImage);

  if (
    typeof fields.title !== "string" ||
    typeof fields.slug !== "string" ||
    typeof fields.smallIntro !== "string" ||
    typeof fields.category !== "string" ||
    typeof fields.date !== "string" ||
    !mainImage
  ) {
    return null;
  }

  const country = fields.country
    ? parseContentfulCountry(
        fields.country as unknown as Entry<CountrySkeleton>
      )
    : undefined;

  return {
    title: fields.title,
    slug: fields.slug,
    smallIntro: fields.smallIntro,
    date: fields.date,
    href: generatePostHref(fields.slug, country),
    mainImage,
  };
}
