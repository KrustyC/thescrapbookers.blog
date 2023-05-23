type Messages = typeof import("./messages/en.json");
declare interface IntlMessages extends Messages {}

declare module '*.mp4' {
    const src: string;
    export default src;
  }