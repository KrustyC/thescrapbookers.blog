import createMiddleware from "next-intl/middleware";
// import { NextRequest, NextResponse } from "next/server";

export default createMiddleware({
  locales: ["en", "it"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
});

// const intlMiddleware = createMiddleware({
//   locales: ["en", "it"],
//   defaultLocale: "en",
// });

// const SKIP_PREFIXES = [
//   "/_next",
//   "/api",
//   "/en/api",
//   "/it/api",
//   "/favicon.ico",
//   "/robots.txt",
//   "/_ipx",
//   "/__nextjs",
//   "/icons",
// ];

// export function middleware(req: NextRequest) {
//   if (SKIP_PREFIXES.some((prefix) => req.nextUrl.pathname.startsWith(prefix))) {
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// export default intlMiddleware;

export const config = {
  // Skip all paths that should not be internationalized
  matcher:
    "/((?!icons|_next|__nexts|sitemap.xml|robots.txt|_ipx|favicon.ico|api|en/api|it/api).*)",
};

// |api|en/api|it/api
