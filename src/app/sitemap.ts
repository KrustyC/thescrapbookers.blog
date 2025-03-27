const BASE_PATHS = ["", "/about-us", "/all-articles"];

async function fetchPostRoutes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
    next: { revalidate: 30 },
  });
  const { posts } = await res.json();

  return posts.map((post: { href: string; lastModified: Date }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${post.href}`,
    lastModified: post.lastModified,
  }));
}

async function fetchCountriesRoutes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/country`, {
    next: { revalidate: 30 },
  });
  const { countries } = await res.json();

  return countries.map((country: { href: string; lastModified: Date }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${country.href}`,
    lastModified: country.lastModified,
  }));
}

async function fetchContinentsRoutes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/continent`, {
    next: { revalidate: 30 },
  });
  const { continents } = await res.json();

  return continents.map((continent: { href: string; lastModified: Date }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${continent.href}`,
    lastModified: continent.lastModified,
  }));
}

export default async function sitemap() {
  const baseRoutes = BASE_PATHS.map((path) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
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
