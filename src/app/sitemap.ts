import { Post } from "types/global";

const BASE_PATHS = ["", "/about-us"];

async function fetchPostRoutes() {
  const res = await fetch(`${process.env.baseUrl}/en/api/post`);
  const { posts } = await res.json();

  return posts.map((post: Post) => ({
    url: `${process.env.baseUrl}${post.href}`,
    lastModified: post.date,
  }));
}

export default async function sitemap() {
  const baseRoutes = BASE_PATHS.map((path) => ({
    url: `${process.env.baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));

  const postsRoutes = await fetchPostRoutes();

  return [...baseRoutes, ...postsRoutes];
}
