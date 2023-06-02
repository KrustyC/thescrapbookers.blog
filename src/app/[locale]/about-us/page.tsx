import Image from "next/image";
import { useTranslations } from "next-intl";

import { crimsonText, leagueGothic } from "@/utils/fonts";

import aboutUsPic from "../../../../public/images/about-us.jpg";

interface SidebarProps {
  title: string;
  description: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title, description }) => {
  return (
    <div className="w-1/3 bg-primary flex justify-center">
      <div className="h-screen sticky top-5 mt-36 flex-col lg:px-12 xl:px-20 text-white">
        <h1 className="leading-[5rem] text-8xl" style={leagueGothic.style}>
          {title}
        </h1>

        <p className="pr-4 my-6">{description}</p>
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
      <div className="flex">
        <Sidebar title={t("title")} description={t("description")} />

        <div className="w-2/3 bg-white mt-36 pb-24">
          <div className="flex flex-col gap-y-6 text-2xl w-[720px] mx-auto">
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
      <div className="h-[550px] w-full bg-[green]"> CIAO</div>
    </div>
  );
}
