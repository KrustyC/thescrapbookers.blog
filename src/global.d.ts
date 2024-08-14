type Messages = typeof import("../public/messages/en.json");
declare interface IntlMessages extends Messages {}

declare module "*.mp4" {
  const src: string;
  export default src;
}
