import { wrap } from "@netlify/integrations";
import { HandlerEvent, HandlerContext } from "@netlify/functions";
import { SentryContext, withSentry } from "@netlify/sentry";

const withIntegrations = wrap(withSentry);

const handler = withIntegrations(
  async (event: HandlerEvent, context: HandlerContext & SentryContext) => {
    // Add handler function content here
    throw new Error("Report this to sentryy")
  }
);

export { handler };