const BASE_PATHS = ["", "/about-us"];

async function fetchPostRoutes() {
  const res = await fetch(`${process.env.baseUrl}/api/post`, {
    next: { revalidate: 30 },
  });
  const { posts } = await res.json();

  return posts.map((post: { href: string; lastModified: Date }) => ({
    url: `${process.env.baseUrl}${post.href}`,
    lastModified: post.lastModified,
  }));
}

async function fetchCountriesRoutes() {
  const res = await fetch(`${process.env.baseUrl}/api/country`, {
    next: { revalidate: 30 },
  });
  const { countries } = await res.json();

  return countries.map((country: { href: string; lastModified: Date }) => ({
    url: `${process.env.baseUrl}${country.href}`,
    lastModified: country.lastModified,
  }));
}

async function fetchContinentsRoutes() {
  const res = await fetch(`${process.env.baseUrl}/api/continent`, {
    next: { revalidate: 30 },
  });
  const { continents } = await res.json();

  return continents.map((continent: { href: string; lastModified: Date }) => ({
    url: `${process.env.baseUrl}${continent.href}`,
    lastModified: continent.lastModified,
  }));
}

export default async function sitemap() {
  const baseRoutes = BASE_PATHS.map((path) => ({
    url: `${process.env.baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));

  const continentsRoutes = await fetchContinentsRoutes();
  const countriesRoutes = await fetchCountriesRoutes();
  const postsRoutes = await fetchPostRoutes();

  return [
    ...baseRoutes,
    ...continentsRoutes,
    ...countriesRoutes,
    ...postsRoutes,
  ];
}
