"use client";

import { PropsWithChildren, useState } from "react";
import classNames from "classnames";
import Link from "next/link";

import { BanknotesIcon } from "@/icons/Banknotes";
import { BookIcon } from "@/icons/Book";
import { CakeIcon } from "@/icons/Cake";
import { ChevronDown } from "@/icons/ChevronDown";
import { CityIcon } from "@/icons/City";
import { FoodBowlIcon } from "@/icons/FoodBowl";
import { LanguageIcon } from "@/icons/Language";
import { OfficeIcon } from "@/icons/Office";
import { PeopleIcon } from "@/icons/People";
import { VisaIcon } from "@/icons/Visa";
import {
  Country,
  CountryCheatsheetCommonPhrase,
  CountryCheatsheetCoworkingSpace,
} from "@/types/global";

import { Flag } from "./Flag";

const formatValue = (value: number | string | string[]) => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "number") {
    return Intl.NumberFormat().format(value);
  }

  return value;
};

interface InfoBoxProps {
  title: string;
  icon?: React.ReactNode;
  value: number | string | string[];
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, icon, value }) => (
  <div className="flex items-center justify-between gap-2 lg:flex-col lg:items-start">
    <div className="flex items-start gap-1">
      {icon ? <div className="mt-0.5 lg:mt-1">{icon}</div> : null}
      <h3 className="uppercase font-medium text-base lg:text-xl">{title}</h3>
    </div>
    <span className="ml-6 text-sm lg:text-base">{formatValue(value)}</span>
  </div>
);

interface DetailBoxProps {
  title: string;
  icon?: React.ReactNode;
}

const DetailBox: React.FC<PropsWithChildren<DetailBoxProps>> = ({
  title,
  icon,
  children,
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-start gap-1">
      {icon ? <div className="mt-0.5 lg:mt-1">{icon}</div> : null}
      <h3 className="uppercase font-medium text-base lg:text-xl">{title}</h3>
    </div>
    {children}
  </div>
);

interface CheatsheetBannerInfo<T> {
  heading: string;
  value: T;
}

export interface CheatsheetBannerInfos {
  capital: CheatsheetBannerInfo<string>;
  population: CheatsheetBannerInfo<string>;
  lifeExpectancy: CheatsheetBannerInfo<string>;
  languages: CheatsheetBannerInfo<string[]>;
  currencies: CheatsheetBannerInfo<string[]>;
  eVisa: CheatsheetBannerInfo<string>;
  dishes: CheatsheetBannerInfo<string[]>;
  phrases: CheatsheetBannerInfo<CountryCheatsheetCommonPhrase[]>;
  coworkingSpaces: CheatsheetBannerInfo<CountryCheatsheetCoworkingSpace[]>;
}

interface CheatsheetBannerProps {
  country: Required<Pick<Country, "name" | "slug" | "cheatsheet">>;
  copy: {
    title: string;
    description: string;
    seeMore: string;
    seeLess: string;
    info: CheatsheetBannerInfos;
  };
}

export const CheatsheetBanner: React.FC<CheatsheetBannerProps> = ({
  country,
  copy,
}) => {
  const { name, slug } = country;
  const [isExpanded, setIsExpanded] = useState(false);

  const onToggleExpanded = () => setIsExpanded((currentVal) => !currentVal);

  return (
    <div className="px-3 lg:px-6 pt-12 pb-4 w-full 2xl:w-max 2xl:mx-auto flex flex-col rounded-2xl bg-cheatsheet/10 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center border-y border-black py-6 px-2">
        <div className="flex flex-col">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-2xl lg:text-3xl flex flex-col font-semibold">
              <span>{name}</span>
              <span>{copy.title}</span>
            </h2>
            <div className="block lg:hidden pr-2 mb-0.5">
              <Flag slug={slug} />
            </div>
          </div>
          <p>{copy.description}</p>
          <div className="flex items-center gap-1 lg:gap-2 pt-4 lg:pt-6">
            <VisaIcon className="w-10 h-10" />
            <a
              className="underline font-medium text-base lg:text-xl"
              href={copy.info.eVisa.value}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.info.eVisa.heading}
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <Flag slug={slug} />
        </div>
      </div>
      <div
        className={classNames("transition-all duration-300 ease-in-out", {
          "hidden h-0 lg:h-auto lg:block": !isExpanded,
          "block h-auto": isExpanded,
        })}
      >
        <div className="py-8 flex flex-col lg:flex-row lg:justify-between flex-wrap gap-x-2 gap-y-6 px-2">
          <InfoBox
            title={copy.info.capital.heading}
            value={copy.info.capital.value}
            icon={<CityIcon className="w-5 h-5" />}
          />
          <InfoBox
            title={copy.info.population.heading}
            value={copy.info.population.value}
            icon={<PeopleIcon className="w-5 h-5" />}
          />
          <InfoBox
            title={copy.info.languages.heading}
            value={copy.info.languages.value}
            icon={<LanguageIcon className="w-5 h-5" />}
          />
          <InfoBox
            title={copy.info.lifeExpectancy.heading}
            value={copy.info.lifeExpectancy.value}
            icon={<CakeIcon className="w-5 h-5" />}
          />
          <InfoBox
            title={copy.info.currencies.heading}
            value={copy.info.currencies.value}
            icon={<BanknotesIcon className="w-5 h-5" />}
          />
        </div>

        <div className="flex flex-col lg:flex-row border-t border-black px-2">
          <div className="py-8 border-b lg:border-b-0 lg:border-r border-black flex-1 lg:pr-12">
            <DetailBox
              title={copy.info.dishes.heading}
              icon={<FoodBowlIcon className="w-5 h-5" />}
            >
              <ul>
                {copy.info.dishes.value.map((dish, i) => (
                  <li key={i} className="text-sm lg:text-base">
                    {dish}
                  </li>
                ))}
              </ul>
            </DetailBox>
          </div>

          <div className="py-8 flex-1 lg:pl-12">
            <DetailBox
              title={copy.info.phrases.heading}
              icon={<BookIcon className="w-5 h-5" />}
            >
              <ul>
                {copy.info.phrases.value.map(({ phrase, meaning }, i) => (
                  <li
                    key={i}
                    className="flex flex-col lg:flex-row lg:items-center mb-3 last:mb-0 lg:mb-0"
                  >
                    <span className="h-full lg:leading-7 text-sm lg:text-base lg:mr-0.5">
                      {phrase}
                    </span>
                    <span className="text-sm italic h-full lg:leading-7">
                      - {meaning}
                    </span>
                  </li>
                ))}
              </ul>
            </DetailBox>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-8 border-t border-black py-8 px-2">
          <DetailBox
            title={copy.info.coworkingSpaces.heading}
            icon={<OfficeIcon className="w-5 h-5" />}
          >
            {copy.info.coworkingSpaces.value.length > 0 ? (
              <div className="w-full flex flex-wrap gap-4 lg:gap-8 pt-2">
                {copy.info.coworkingSpaces.value.map((space, i) => (
                  <div className="flex flex-col gap-0.5 lg:gap-2" key={i}>
                    <Link
                      className="text-lg lg:text-2xl !font-extralight font-poppins uppercase"
                      href={space.website || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {space.name}
                    </Link>
                    <span className="text-sm">{space.reason}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="font-semibold">N/A</span>
            )}
          </DetailBox>
        </div>
      </div>

      <div
        className="flex items-center justify-center gap-2 pt-8 lg:hidden"
        onClick={onToggleExpanded}
      >
        <ChevronDown
          className={classNames(
            "w-5 h-5 transition-rotate duration-300 ease-in-out",
            {
              "rotate-180": isExpanded,
            }
          )}
        />
        <span>{isExpanded ? copy.seeLess : copy.seeMore}</span>
        <ChevronDown
          className={classNames(
            "w-5 h-5 transition-rotate duration-300 ease-in-out",
            {
              "rotate-180": isExpanded,
            }
          )}
        />
      </div>
    </div>
  );
};
