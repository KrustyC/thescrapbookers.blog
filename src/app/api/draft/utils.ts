import { getContentfulClient } from "@/utils/contentful-client";
import { generatePostHref } from "@/utils/hrefs";

export async function getPostById(id: string) {
  const client = getContentfulClient({ preview: true });

  const result = await client.getEntries({
    "sys.id": id,
    content_type: "post",
    locale: "en",
    include: 3,
    select: ["fields.slug", "fields.country"],
  });

  if (result?.items.length === 0) {
    throw new Error(`Could not find post with id ${id}`);
  }

  const post = result?.items[0];
  return {
    href: generatePostHref(
      post.fields.slug as unknown as string,
      post.fields.country as any
    ),
  };
}

export async function getCountryById(id: string) {
  const client = getContentfulClient({ preview: true });

  const result = await client.getEntries({
    "sys.id": id,
    content_type: "country",
    locale: "en",
    include: 2,
    select: ["fields.slug", "fields.continent"],
  });

  if (result?.items.length === 0) {
    throw new Error(`Could not find country with id ${id}`);
  }

  const country = result?.items[0] as any;
  return {
    href: `/${country.fields?.continent?.fields?.slug}/${country.fields.slug}`,
  };
}

export async function getContinentById(id: string) {
  const client = getContentfulClient({ preview: true });

  const result = await client.getEntries({
    "sys.id": id,
    content_type: "continent",
    locale: "en",
    select: ["fields.slug"],
  });

  if (result?.items.length === 0) {
    throw new Error(`Could not find continent with id ${id}`);
  }

  const continent = result?.items[0] as any;
  return {
    href: `/${continent?.fields?.slug}`,
  };
}
