"use client";

import { PropsWithChildren, useState } from "react";
import classNames from "classnames";
import Link from "next/link";

import { BookIcon } from "@/icons/Book";
import { ChevronDown } from "@/icons/ChevronDown";
import { CityIcon } from "@/icons/City";
import { CurrencyEuroIcon } from "@/icons/CurrencyEuro";
import { LanguageIcon } from "@/icons/Language";
import { OfficeIcon } from "@/icons/Office";
import { PeopleIcon } from "@/icons/People";
import { Country } from "@/types/global";

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
  <div className="flex gap-2 lg:flex-col w-full">
    <div className="flex items-start gap-1">
      {icon ? <div className="mt-1">{icon}</div> : null}
      <h3 className="uppercase font-medium text-xl w-3/5 lg:w-full">{title}</h3>
    </div>
    <span className="w-2/5 lg:w-full">{formatValue(value)}</span>
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
  <div className="flex flex-col gap-2 w-full">
    <div className="flex items-start gap-1">
      {icon ? <div className="mt-1">{icon}</div> : null}
      <h3 className="uppercase font-medium text-xl w-3/5 lg:w-full">{title}</h3>
    </div>
    {children}
  </div>
);

interface CheatsheetBannerProps {
  country: Required<Pick<Country, "name" | "slug" | "cheatsheet">>;
  copy: {
    title: string;
    description: string;
    seeMore: string;
  };
}

export const CheatsheetBanner: React.FC<CheatsheetBannerProps> = ({
  country,
  copy,
}) => {
  const { name, slug, cheatsheet } = country;
  const [isExpanded, setIsExpanded] = useState(false);

  const onToggleExpanded = () => setIsExpanded((currentVal) => !currentVal);

  return (
    <div className="px-5 py-8 w-full 2xl:w-max 2xl:mx-auto flex flex-col rounded-2xl bg-cheatsheet/10 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center border-y border-black py-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-3xl flex flex-col font-semibold">
              <span>{name}</span>
              <span>{copy.title}</span>
            </h2>
            <div className="block lg:hidden pr-2 mb-0.5">
              <Flag slug={slug} />
            </div>
          </div>
          <p>{copy.description}</p>
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
        <div className="py-8 flex flex-col lg:flex-row lg:justify-between gap-x-2 gap-y-4">
          <InfoBox
            title="Language"
            value={cheatsheet.language}
            icon={<LanguageIcon className="w-5 h-5" />}
          />
          <InfoBox
            title="Capital"
            value={cheatsheet.capital}
            icon={<CityIcon className="w-5 h-5" />}
          />
          <InfoBox
            title="Currency"
            value={cheatsheet.currency}
            icon={<CurrencyEuroIcon className="w-5 h-5" />}
          />
          <InfoBox
            title="Population"
            value={cheatsheet.population}
            icon={<PeopleIcon className="w-5 h-5" />}
          />
        </div>
        <div className="py-8 flex flex-col lg:flex-row gap-y-8 border-t border-black">
          <DetailBox
            title="5 Basic Words"
            icon={<BookIcon className="w-5 h-5" />}
          >
            <ul>
              {cheatsheet.basicWords.map(({ word, meaning }, i) => (
                <li key={i}>
                  {word} (<span className="italic">{meaning}</span>)
                </li>
              ))}
            </ul>
          </DetailBox>
          <DetailBox title="Fave Dishes">
            <ul>
              {cheatsheet.dishes.map((dish, i) => (
                <li key={i}>{dish}</li>
              ))}
            </ul>
          </DetailBox>
          <DetailBox title="Visa Website">
            <Link
              href={cheatsheet.visaWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cheatsheet.visaWebsite}
            </Link>
          </DetailBox>

          <DetailBox
            title="Fave Coworking Space"
            icon={<OfficeIcon className="w-5 h-5" />}
          >
            {cheatsheet?.faveCoworkingSpace ? (
              <Link
                href={cheatsheet?.faveCoworkingSpace?.website || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cheatsheet.faveCoworkingSpace.name}
              </Link>
            ) : (
              <span>Missing coworking space</span>
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
        <span>{copy.seeMore}</span>
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
