import Image from "next/image";
import { useTranslations } from "next-intl";

import { crimsonText, leagueGothic } from "@/utils/fonts";

import aboutUsPic from "../../../../public/images/about-us.jpg";
import cameronHighlands from "../../../../public/images/cameron_highlands.jpg";

interface SidebarProps {
  title: string;
  description: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title, description }) => {
  return (
    <div className="w-full lg:w-1/3 bg-primary flex justify-center">
      <div className="lg:h-screen lg:sticky lg:top-5 lg:mt-36 flex-col px-8 lg:px-12 xl:px-20 pt-28 pb-16 lg:py-0 text-white">
        <h1
          className="lg:leading-[5rem] text-7xl lg:text-8xl"
          style={leagueGothic.style}
        >
          {title}
        </h1>

        <p className="mt-2 lg:mt-6 mb-8 lg:mb-6 lg:pr-4">{description}</p>
        <div className="w-full aspect-square relative rounded-2xl border-4 border-black">
          <Image
            className="rounded-xl"
            src={aboutUsPic}
            alt="us taking a selfie in the jungle"
            placeholder="blur"
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default function AboutUsPage() {
  const t = useTranslations("AboutUs");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row">
        <Sidebar title={t("title")} description={t("description")} />

        <div className="w-full lg:w-2/3 bg-white lg:mt-36 lg:pb-24 px-4 lg:px-0 py-12 lg:py-0">
          <div className="flex flex-col gap-y-6 text-2xl w-full lg:w-[720px] lg:mx-auto">
            <p style={crimsonText.style}>{t("Generic.firstParagraph")}</p>
            <p style={crimsonText.style}>{t("Generic.secondParagraph")}</p>
            <p style={crimsonText.style}>{t("Generic.thirdParagraph")}</p>
            <p style={crimsonText.style}>{t("Generic.fourthParagraph")}</p>
            <p style={crimsonText.style}>{t("Generic.fifthParagraph")}</p>
            <p style={crimsonText.style}>{t("Generic.sixthParagraph")}</p>
            <p style={crimsonText.style}>{t("Generic.seventhParagraph")}</p>
          </div>
        </div>
      </div>
      <div className="h-[800px] w-full relative">
        <Image
          src={cameronHighlands}
          alt="Tea plantation in Cameron Highlands, Tanha Rata, Malaysia"
          placeholder="blur"
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
