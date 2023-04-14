import format from "date-fns/format";
import { it, enGB } from "date-fns/locale";
import { AppLocale } from "types/global";

interface FormatDateOptions {
  date: Date;
  format: string;
  locale: AppLocale;
}

function getLocale(locale: AppLocale) {
  if (locale === "it") {
    return it;
  }

  return enGB;
}

export function getFormat(locale: AppLocale) {
  if (locale === "it") {
    return "dd MMMM yyyy";
  }

  return "MMMM dd, yyyy";
}

export function formatDate({
  date,
  format: formatToUse,
  locale,
}: FormatDateOptions) {
  return format(new Date(date), formatToUse, { locale: getLocale(locale) });
}
