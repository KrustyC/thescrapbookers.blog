import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { LOCALES } from "./constants";

export const { Link, useRouter, usePathname, redirect } =
  createSharedPathnamesNavigation({ locales: LOCALES });
