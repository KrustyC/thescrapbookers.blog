const ms = require("ms");
const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  env: {
    environment: process.env.ENVIRONMENT || "local",
    baseUrl: process.env.BASE_URL || "http://localhost:8888",
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
  headers() {
    return [
      {
        // Cache all content pages
        source: "/((?!_next|.*\\..*).*)",
        headers: [
          {
            key: "Cache-Control",
            value: [
              `s-maxage=` + ms("1d") / 1000,
              `stale-while-revalidate=` + ms("1y") / 1000,
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
