const ms = require("ms");
const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  experimental: {
    serverActions: true,
    // nextScriptWorkers: true, @TODO Enable once Partytown and worker are supported in the app folder
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
  headers() {
    return [
      {
        // Cache all content pages
        source: "/((?!_next|!sitemap.xml|.*\\..*).*)",
        headers: [
          {
            key: "Cache-Control",
            value: [
              `s-maxage=` + ms("1d") / 1000,
              `stale-while-revalidate=` + ms("30d") / 1000,
            ].join(", "),
          },
        ],
        missing: [
          {
            type: "header",
            key: "Next-Router-Prefetch",
          },
        ],
      },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/en',
  //       destination: '/',
  //       permanent: true
  //     },
  //     {
  //       source: '/en/:path*',
  //       destination: '/:path*',
  //       permanent: true
  //     },
  //   ]
  // },
});

// Injected content via Sentry wizard below

module.exports = withSentryConfig(
  nextConfig,
  {
    // https://github.com/getsentry/sentry-webpack-plugin#options
    // Suppresses source map uploading logs during build
    silent: true,
    org: "the-scrapbookers",
    project: "the-scrapbookers-blog",
    authToken: process.env.SENTRY_AUTH_TOKEN,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
    widenClientFileUpload: true,
    transpileClientSDK: true,
    hideSourceMaps: true,
    disableLogger: true,
  }
);
