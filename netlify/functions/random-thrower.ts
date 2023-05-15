import { wrap } from "@netlify/integrations";
import { HandlerEvent, HandlerContext } from "@netlify/functions";
import { SentryContext, withSentry } from "@netlify/sentry";

const withIntegrations = wrap(withSentry);

const handler = withIntegrations(
  async (event: HandlerEvent, context: HandlerContext & SentryContext) => {
    throw Error("yet another error");
  }
);

export { handler };