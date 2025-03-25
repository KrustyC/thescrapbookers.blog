import { createNavigation } from "next-intl/navigation";

import { LOCALES } from "./constants";

export const { Link, useRouter, usePathname, redirect } = createNavigation({
  locales: LOCALES,
});
