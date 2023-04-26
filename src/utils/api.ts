import { AppLocale, Post } from "types/global";

interface GetPostsByTagParams {
  tag: "featured" | "smallnoteHome";
  locale: AppLocale;
}

export async function getPostsByTag({
  tag,
  locale,
}: GetPostsByTagParams): Promise<{ posts: Post[] }> {
  const url = `${process.env.baseUrl}/${locale}/post/api?tag=${tag}`;
  const res = await fetch(url);
  // const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface GetPostResponse {
  post: Post;
  nextPost: Pick<Post, "title" | "slug" | "date" | "mainImage" | "smallIntro">;
}

export async function getPost(
  slug: string,
  locale: AppLocale
): Promise<GetPostResponse> {
  const url = `${process.env.baseUrl}/${locale}/post/api/${slug}`;
  const res = await fetch(url);
  // const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
