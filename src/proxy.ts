import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!icons|images|videos|_next/static|_next/image|api|en/api|it/api|sitemap.xml|robots.txt|_ipx|favicon.ico).*)",
  ],
};
