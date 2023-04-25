import { AppLocale, Post } from "types/global";

export async function getPostsByTag({
  tag,
  locale,
}: {
  tag: "featured" | "smallnoteHome";
  locale: AppLocale;
}): Promise<{ posts: Post[] }> {
  const url = `${process.env.baseUrl}/${locale}/post/api?tag=${tag}`;
  const res = await fetch(url);
  // const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
