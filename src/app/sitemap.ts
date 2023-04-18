// import { AppLocale, Post } from "types/global";

const BASE_ROUTES = ["", "/a-lil-introduction"];

// async function postsRoutesForLocale(locale: AppLocale) {
//   const res = await fetch(`${process.env.baseUrl}/${locale}/post/api`);

//   const { posts } = await res.json();

//   return posts.map((post: Post) => {
//     if (locale === "en") {
//       return {
//         url: `${process.env.baseUrl}/post/${post.slug}`, // No need to include the locale for english posts
//         lastModified: post.date,
//       };
//     }

//     return {
//       url: `${process.env.baseUrl}/${locale}/post/${post.slug}`,
//       lastModified: post.date,
//     };
//   });
// }

export default async function sitemap() {
  // const [englishPosts, italianPosts] = await Promise.all([
  //   postsRoutesForLocale("en"),
  //   postsRoutesForLocale("it"),
  // ]);

  const italianRoutes = BASE_ROUTES.map((route) => `/it${route}`);

  const allRoutes = [...BASE_ROUTES, ...italianRoutes].map((route) => ({
    url: `${process.env.baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...allRoutes];
  // return [...allRoutes, ...englishPosts, ...italianPosts];
}
