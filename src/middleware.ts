// import createMiddleware from "next-intl/middleware";
// import { NextRequest, NextResponse } from "next/server";

// // const intlMiddleware = createMiddleware({
// //   locales: ["en", "it"],
// //   defaultLocale: "en",
// // });

// // const SKIP_PREFIXES = [
// //   "/_next",
// //   "/api",
// //   "/en/api",
// //   "/it/api",
// //   "/favicon.ico",
// //   "/robots.txt",
// //   "/_ipx",
// //   "/__nextjs",
// //   "/icons",
// // ];

// // export function middleware(req: NextRequest) {
// //   if (SKIP_PREFIXES.some((prefix) => req.nextUrl.pathname.startsWith(prefix))) {
// //     return NextResponse.next();
// //   }

// //   return intlMiddleware(req);
// // }

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ["en", "it"],

//   // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
//   defaultLocale: "en",
// });

// export const config = {
//   // Skip all paths that should not be internationalized
//   matcher: [
//     "/((?!icons|_next/static|_next/image|api|en/api|it/api|sitemap.xml|robots.txt|_ipx|favicon.ico).*)",
//   ],
// };

import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "it"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    "/((?!icons|images|_next/static|_next/image|api|en/api|it/api|sitemap.xml|robots.txt|_ipx|favicon.ico).*)",
  ],
};
