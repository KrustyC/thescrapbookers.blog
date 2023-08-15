"use client";

import { useParams } from "next/navigation";

import { ButtonLink } from "@/components/uikit/ButtonLink";
import { BugFixingIcon } from "@/icons/BugFixing";
import { AppLocale } from "@/types/global";

const ERROR_MESSAGES = {
  it: "Oops, sembra che si sia verificato un errore durante il ritrovameto del paese. Ti preghiamo di riprovare più tardi, o provare con un altro slug.",
  en: "Oops, it seems that an error occurred while retrieving the country data. Please try again later, or try with another slug.",
};

const CTA = {
  it: "Torna alla Home",
  en: "Back to Home",
};

export default function ContinentError() {
  const params = useParams() as { locale?: AppLocale } | null;
  const locale = params?.locale || "en";

  return (
    <div className="flex flex-col items-center w-full py-12">
      <BugFixingIcon className="h-[180px] w-[320px] lg:h-[480px] lg:w-[620px]" />
      <h2 className="text-base lg:text-4xl w-[320px] lg:w-[620px] my-8">
        {ERROR_MESSAGES[locale]}
      </h2>
      <ButtonLink href="/" variant="black">
        {CTA[locale]}
      </ButtonLink>
    </div>
  );
}
