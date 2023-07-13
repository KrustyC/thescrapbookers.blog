import Image from "next/image";
import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/uikit/ButtonLink";
import { poppins } from "@/utils/fonts";

import aboutUsPic from "../../../public/images/about-us.jpg";

export const AboutUsSection: React.FC = () => {
  const t = useTranslations("Home.AboutUs");

  return (
    <div className="bg-gray-100 lg:bg-white lg:h-[450px] xl:h-[500px] flex flex-col-reverse lg:flex-row lg:justify-between gap-8 lg:gap-20 py-16 lg:py-0 lg:my-20 w-full">
      <div className="bg-gray-100 flex flex-col justify-center items-end w-full lg:w-7/12 xl:w-2/3 px-6 lg:p-12 xl:p-24 md:rounded-r-2xl">
        <div>
          <h2
            style={poppins.style}
            className="mb-4 xl:mb-6 uppercase font-semibold text-gray-400 text-sm leading-[0.8rem] tracking-widest"
          >
            {t("title")}
          </h2>
          <p className="text-left text-xl lg:max-w-[650px] mb-4 xl:mb-6">
            {t("text")}
          </p>
          <ButtonLink variant="black" href="/about-us">
            {t("cta")}
          </ButtonLink>
        </div>
      </div>

      <div className="mx-6 lg:mx-0 lg:w-5/12 xl:w-1/3 h-[500px] lg:h-full relative rounded-2xl lg:rounded-r-none">
        <Image
          className="rounded-2xl lg:rounded-r-none"
          src={aboutUsPic}
          alt="us taking a selfie in the jungle"
          placeholder="blur"
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};
