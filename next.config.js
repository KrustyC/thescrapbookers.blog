// const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");
const createNextIntlPlugin = require("next-intl/plugin");
const { withSentryConfig } = require("@sentry/nextjs");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  reactCompiler: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.ctfassets.net" }],
    loader: "custom",
    loaderFile: "./src/utils/contentfulImageLoader.ts",
  },
});

module.exports = withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "the-scrapbookers",
  project: "the-scrapbookers-blog",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
  transpileClientSDK: true,
  hideSourceMaps: true,
});
