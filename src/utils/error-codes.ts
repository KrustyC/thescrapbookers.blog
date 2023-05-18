export const NEWSLETTER_SUBSCIRBE_ERRORS = {
  GENERIC: "generic",
  USER_ALREADY_EXISTS: "userAlreadyExists",
};

export type NewsletterSubscribeErroCode =
  (typeof NEWSLETTER_SUBSCIRBE_ERRORS)[keyof typeof NEWSLETTER_SUBSCIRBE_ERRORS];
