import { formats } from "@/i18n/request";

import en from "../public/messages/en.json";

type Messages = typeof import("../public/messages/en.json");
declare interface IntlMessages extends Messages {}

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof en;
    Formats: typeof formats;
  }
}
