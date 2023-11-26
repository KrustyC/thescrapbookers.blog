const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  experimental: {
    // serverActions: true,
    // nextScriptWorkers: true, @TODO Enable once Partytown and worker are supported in the app folder
  },
  images: {
    domains: ["images.ctfassets.net"],
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
