import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "it"],
  defaultLocale: "en",
  localePrefix: "as-needed"
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    "/((?!icons|images|videos|_next/static|_next/image|api|en/api|it/api|sitemap.xml|robots.txt|_ipx|favicon.ico).*)",
  ],
};
