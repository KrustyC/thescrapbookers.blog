import Image from "next/image";
import { useTranslations } from "next-intl";

import { merriweather, ooohBaby } from "@/utils/fonts";

import aboutUsPic from "../../../../public/images/about-us.jpg";
import cameronHighlands from "../../../../public/images/cameron_highlands.png";

interface SidebarProps {
  title: string;
  description: {
    part1: string;
    part2: string;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ title, description }) => {
  return (
    <div className="w-full lg:w-1/3 bg-primary flex justify-center pb-8 lg:pb-24">
      <div className="lg:h-screen lg:sticky lg:top-5 lg:mt-36  flex-col px-8 xl:px-12 xl:px-20 pt-28 pb-16 lg:py-0 text-white">
        <div className="mb-8 lg:mb-6 w-full aspect-square relative rounded-2xl border-4 border-black">
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

        <h1 className={`lg:leading-[4rem] text-6xl mb-1 ${ooohBaby.className}`}>
          {title}
        </h1>

        <div className="text-lg lg:leading-[1.7rem] font-medium">
          <p>{description.part1}</p>
          <p>{description.part2}</p>
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
        <Sidebar
          title={t("title")}
          description={{
            part1: t("description.part1"),
            part2: t("description.part2"),
          }}
        />

        <div className="w-full lg:w-2/3 bg-white lg:mt-36 lg:pb-24 px-5 md:px-16 lg:px-12 xl:px-0 py-12 lg:py-0">
          <div className="flex flex-col gap-y-6 text-lg w-full xl:w-[720px] lg:mx-auto pb-[100px] xl:pb-[250px] leading-[1.9rem]">
            <p className={merriweather.className}>
              {t("Generic.firstParagraph")}
            </p>
            <p className={merriweather.className}>
              {t("Generic.secondParagraph")}
            </p>
            <p className={merriweather.className}>
              {t("Generic.thirdParagraph")}
            </p>
            <p className={merriweather.className}>
              {t("Generic.fourthParagraph")}
            </p>
            <p className={merriweather.className}>
              {t("Generic.fifthParagraph")}
            </p>
            <p className={merriweather.className}>
              {t("Generic.sixthParagraph")}
            </p>
            <p className={merriweather.className}>
              {t("Generic.seventhParagraph")}
            </p>
          </div>
        </div>
      </div>
      <div className="h-[800px] w-full relative -mt-[300px] xl:-mt-[250px]">
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
