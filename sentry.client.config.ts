// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  debug: false,
  replaysSessionSampleRate: 0.1,
  tracesSampleRate: 0.3,
  replaysOnErrorSampleRate: 1.0,
  integrations: [new Sentry.Replay()],
  // plus for 100% of sessions with an error
});
