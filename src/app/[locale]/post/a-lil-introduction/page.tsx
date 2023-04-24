import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AppLocale } from "types/global";

interface IntroductionPageProps {
  params: {
    locale: AppLocale;
  };
}

export async function generateMetadata({
  params: { locale },
}: IntroductionPageProps): Promise<Metadata> {
  const t = await getTranslations("AboutUs.Metadata");

  return {
    title: t("title"),
    description: t("description"),
    authors: [
      { name: "Davide Crestini", url: "https://dcrestini.me" },
      { name: "Beatrice Cox", url: "https://beatricecox.com" },
    ],
    creator: "Davide Crestini",
    publisher: "Beatrice Cox",
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "The Scrapbookers",
      images: [
        {
          url: "/images/about-us.jpg",
          height: 1792,
          width: 2048,
        },
      ],
      locale,
    },
  };
}

export default function ALilIntroductionPage() {
  const t = useTranslations("AboutUs");
  const bea = useTranslations("AboutUs.Beatrice");
  const davide = useTranslations("AboutUs.Davide");
  const generic = useTranslations("AboutUs.Generic");

  return (
    <div className="flex flex-col py-6 lg:py-8">
      <div className="flex flex-col items-center">
        <h1 className="rich-text-copy text-6xl font-semibold text-left pt-12 pb-16">
          {t("title")}
        </h1>
      </div>

      <div className="introduction-letter">
        <p>{bea("firstParagraph")}</p>
        <p>{bea("secondParagraph")}</p>
        <p>{bea("thirdParagraph")}</p>
        <p>{bea("fourthParagraph")}</p>
        <p>{bea("fifthParagraph")}</p>
        <p>{bea("sixthParagraph")}</p>

        <span className="font-bold">Beatrice</span>
      </div>

      <div className="introduction-letter">
        <p>{davide("firstParagraph")}</p>
        <p>{davide("secondParagraph")}</p>
        <p>{davide("thirdParagraph")}</p>
        <p>{davide("fourthParagraph")}</p>
        <p>{davide("fifthParagraph")}</p>

        <span className="font-bold">Davide</span>
      </div>

      <div className="rich-text-copy flex flex-col gap-y-6 text-2xl">
        <p>{generic("firstParagraph")}</p>
        <p>{generic("secondParagraph")}</p>
        <p>{generic("thirdParagraph")}</p>
      </div>
    </div>
  );
}
