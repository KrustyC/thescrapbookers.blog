import { AppLocale, Post } from "@/types/global";

interface GetPostsByTagParams {
  tag?: "featured" | "smallnoteHome";
  locale: AppLocale;
}

export async function getPosts({
  tag,
  locale,
}: GetPostsByTagParams): Promise<{ posts: Post[] }> {
  const url = `${process.env.baseUrl}/${locale}/api/post${
    tag ? `?tag=${tag}` : ""
  }`;
  const res = await fetch(
    url,
    process.env.disableCache ? { next: { revalidate: 0 } } : undefined
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getPostDigitalNomadingHighlightedPost({
  locale,
}: {
  locale: AppLocale;
}): Promise<{ post: Post }> {
  const TAG = "digitalNomadingHighlighted";
  const url = `${process.env.baseUrl}/${locale}/api/post?tag=${TAG}`;
  const res = await fetch(
    url,
    process.env.disableCache ? { next: { revalidate: 0 } } : undefined
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { posts } = (await res.json()) as { posts: Post[] };
  return { post: posts[0] };
}

interface GetPostsByCountryParams {
  country: string;
  locale: AppLocale;
}

export async function getPostsByCountry({
  country,
  locale,
}: GetPostsByCountryParams): Promise<{ posts: Post[] }> {
  const url = `${process.env.baseUrl}/${locale}/api/country/${country}/posts`;
  const res = await fetch(
    url,
    process.env.disableCache ? { next: { revalidate: 0 } } : undefined
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface GetPostParams {
  slug: string;
  locale: AppLocale;
}

interface GetPostResponse {
  post: Post;
  nextPost: Pick<Post, "title" | "slug" | "date" | "mainImage" | "smallIntro">;
}

export async function getPost({
  slug,
  locale,
}: GetPostParams): Promise<GetPostResponse> {
  const url = `${process.env.baseUrl}/${locale}/api/post/${slug}`;
  const res = await fetch(
    url,
    process.env.disableCache ? { next: { revalidate: 0 } } : undefined
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
