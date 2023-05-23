import { useTranslations } from "next-intl";

import { crimsonText, poppins } from "@/utils/fonts";

export default function AboutUsPage() {
  const t = useTranslations("AboutUs");
  const bea = useTranslations("AboutUs.Beatrice");
  const davide = useTranslations("AboutUs.Davide");
  const generic = useTranslations("AboutUs.Generic");

  return (
    <div className="flex flex-col py-6 lg:py-8 mx-auto w-11/12 2xl:w-3/4 ">
      <div className="rich-text-copy flex flex-col gap-y-6 text-2xl mb-12">
        <h1
          style={poppins.style}
          className="text-6xl font-semibold text-left pt-12 pb-10"
        >
          {t("title")}
        </h1>
        <p style={crimsonText.style}>{generic("firstParagraph")}</p>
        <p style={crimsonText.style}>{generic("secondParagraph")}</p>
        <p style={crimsonText.style}>{generic("thirdParagraph")}</p>
        <p style={crimsonText.style}>{generic("fourthParagraph")}</p>
        <p style={crimsonText.style}>{generic("fifthParagraph")}</p>
        <p style={crimsonText.style}>{generic("sixthParagraph")}</p>
        <p style={crimsonText.style}>{generic("seventhParagraph")}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="introduction-letter">
          <div className="flex flex-col gap-y-6">
            <p>{bea("firstParagraph")}</p>
            <p>{bea("secondParagraph")}</p>
            <p>{bea("thirdParagraph")}</p>
            <p>{bea("fourthParagraph")}</p>
            <p>{bea("fifthParagraph")}</p>
            <p>{bea("sixthParagraph")}</p>
          </div>

          <span className="font-bold mt-3">Beatrice</span>
        </div>

        <div className="introduction-letter">
          <div className="flex flex-col gap-y-6">
            <p>{davide("firstParagraph")}</p>
            <p>{davide("secondParagraph")}</p>
            <p>{davide("thirdParagraph")}</p>
            <p>{davide("fourthParagraph")}</p>
            <p>{davide("fifthParagraph")}</p>
          </div>

          <span className="font-bold mt-3">Davide</span>
        </div>
      </div>
    </div>
  );
}
