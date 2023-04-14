const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  env: {
    environment: process.env.ENVIRONMENT || "local",
    baseUrl: process.env.BASE_URL || "http://localhost:8888",
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["assets.example.com", "picsum.photos", "images.ctfassets.net"],
  },
});

module.exports = nextConfig;
