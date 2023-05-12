import { AppLocale, Post } from "types/global";

const BASE_ROUTES = ["", "/about-us"];

async function postsRoutesForLocale(locale: AppLocale) {
  const res = await fetch(`${process.env.baseUrl}/${locale}/api/post`);

  const { posts } = await res.json();

  return posts.map((post: Post) => {
    if (locale === "en") {
      return {
        url: `${process.env.baseUrl}${post.href}`, // No need to include the locale for english posts
        lastModified: post.date,
      };
    }

    return {
      url: `${process.env.baseUrl}/${locale}${post.href}`,
      lastModified: post.date,
    };
  });
}

export default async function sitemap() {
  const [englishPosts, italianPosts] = await Promise.all([
    postsRoutesForLocale("en"),
    postsRoutesForLocale("it"),
  ]);

  const italianBaseRoutes = BASE_ROUTES.map((route) => `/it${route}`);

  const allRoutes = [...BASE_ROUTES, ...italianBaseRoutes].map((route) => ({
    url: `${process.env.baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...allRoutes, ...englishPosts, ...italianPosts];
}
