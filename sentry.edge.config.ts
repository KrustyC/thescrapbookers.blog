// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
});

// https://stream.mux.com/00lGJE5gxu024LMfOBxp5sEjfXEqvYLYbVOgA00Cl4xj400.m3u8