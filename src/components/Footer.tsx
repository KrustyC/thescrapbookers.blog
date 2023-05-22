import { PropsWithChildren } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

import { InstagramIcon } from "@/icons/Instagram";
import { TwitterIcon } from "@/icons/Twitter";
import { AppLocale } from "@/types/global";
import { ooohBaby } from "@/utils/fonts";
import { URLS } from "@/utils/urls";

import logoPic from "../../public/images/logo-black.png";

import { NewsletterForm } from "./NewsletterForm";

interface FooterProps {
  locale: AppLocale;
}

const WaveSvg = () => (
  <svg
    className="bg-transparent rotate-180"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 220"
  >
    <path
      className="fill-primary"
      fillOpacity="1"
      d="M0,64L60,74.7C120,85,240,107,360,106.7C480,107,600,85,720,90.7C840,96,960,128,1080,133.3C1200,139,1320,117,1380,106.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
    />
  </svg>
);

interface CircularButtonLinkProps {
  href: string;
  className?: string;
}

const CircularLink: React.FC<PropsWithChildren<CircularButtonLinkProps>> = ({
  href,
  className = "",
  children,
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center rounded-full bg-black h-8 w-8 ${className}`}
    >
      {children}
    </Link>
  );
};

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const footer = useTranslations("Global.Footer");
  const newsletter = useTranslations("Global.NewsletterForm");

  return (
    <footer className="bg-transparent">
      <WaveSvg />

      <div className="flex flex-col px-16 pb-16 bg-primary">
        <div className="flex justify-between items-end mb-24">
          <div className="flex flex-col">
            <span style={ooohBaby.style} className="text-3xl mb-2">
              {footer("notes")}
            </span>
            <span className="text-3xl mb-2 font-semibold w-[220px] mb-6">
              {footer("newsletterMessage")}
            </span>
            <NewsletterForm
              messages={{
                inputPlaceholder: newsletter("inputPlaceholder"),
                inputError: newsletter("inputError"),
                ctaText: newsletter("cta"),
                dialogs: {
                  success: {
                    title: newsletter("dialogs.success.title"),
                    message: newsletter("dialogs.success.message"),
                  },
                  error: {
                    title: newsletter("dialogs.error.title"),
                    generic: newsletter("dialogs.error.generic"),
                    userAlreadyExist: newsletter(
                      "dialogs.error.userAlreadyExist"
                    ),
                  },
                },
              }}
            />
          </div>

          <div className="flex flex-col gap-4 uppercase font-semibold justify-end text-right">
            <Link href={URLS.asiaArticles()}>{footer("Links.asia")}</Link>
            <Link href={URLS.remoteRoaming()}>
              {footer("Links.remoteRoaming")}
            </Link>
            <Link href={URLS.cheatsheets()}>{footer("Links.cheatsheets")}</Link>
            <Link href={URLS.aboutUs()}>{footer("Links.aboutUs")}</Link>

            <div className="flex gap-4 justify-end">
              <CircularLink href={URLS.instagramURL()}>
                <InstagramIcon className="text-black fill-primary h-6" />
              </CircularLink>
              <CircularLink href={URLS.twitterURL()}>
                <TwitterIcon className="text-black fill-primary h-6" />
              </CircularLink>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-light mt-2">
            ©2023 | The Scrapbookers
          </span>
          <Link className="relative h-20 w-56" href="/" target="_blank">
            <Image
              src={logoPic}
              alt="the scrapbooker logo"
              sizes="100%"
              fill
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};
