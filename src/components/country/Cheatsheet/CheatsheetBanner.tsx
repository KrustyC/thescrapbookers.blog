"use client";

// import Image from "next/image";

import { PropsWithChildren, useState } from "react";
import classNames from "classnames";
import Link from "next/link";

import { ChevronDown } from "@/icons/ChevronDown";
import { CountryCheatsheet } from "@/types/global";

interface CheatsheetBannerProps {
  countryName: string;
  cheatsheet: CountryCheatsheet;
  copy: {
    title: string;
    description: string;
    seeMore: string;
  };
}

interface InfoBoxProps {
  title: string;
  value: number | string | string[];
}

const formatValue = (value: number | string | string[]) => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "number") {
    return Intl.NumberFormat().format(value);
  }

  return value;
};

const InfoBox: React.FC<InfoBoxProps> = ({ title, value }) => (
  <div className="flex gap-2 lg:flex-col w-full lg:w-auto">
    <h3 className="uppercase font-medium text-xl w-3/5 lg:w-full">{title}</h3>
    <span className="w-2/5 lg:w-full">{formatValue(value)}</span>
  </div>
);

const DetailBox: React.FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => (
  <div className="flex flex-col gap-2 w-full">
    <h3 className="uppercase font-medium text-xl w-3/5 lg:w-full">{title}</h3>
    {children}
  </div>
);

export const CheatsheetBanner: React.FC<CheatsheetBannerProps> = ({
  countryName,
  copy,
  cheatsheet,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onToggleExpanded = () => setIsExpanded((currentVal) => !currentVal);

  return (
    <div className="px-5 py-8 w-full 2xl:w-[1024px] 2xl:mx-auto flex flex-col rounded-2xl bg-cheatsheet/10 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:justify-between border-y border-black py-6">
        <div className="flex flex-col">
          <h2 className="text-3xl flex flex-col font-semibold mb-2">
            <span>{countryName}</span>
            <span>{copy.title}</span>
          </h2>
          <p>{copy.description}</p>
        </div>
        <div className="hidden lg:block relative w-[180px] w-[120px] rounded-xl">
          Flag
        </div>
      </div>
      <div
        className={classNames("transition-all duration-300 ease-in-out", {
          "hidden h-0 lg:h-auto lg:block": !isExpanded,
          "block h-auto": isExpanded,
        })}
      >
        <div className="py-8 flex flex-col lg:flex-row lg:justify-between gap-x-2 gap-y-4">
          <InfoBox title="Language" value={cheatsheet.language} />
          <InfoBox title="Capital" value={cheatsheet.capital} />
          <InfoBox title="Main Religion" value={cheatsheet.mainReligions} />
          <InfoBox title="Currency" value={cheatsheet.currency} />
          <InfoBox title="Population" value={cheatsheet.population} />
          <InfoBox title="Area" value={cheatsheet.area} />
        </div>
        <div className="py-8 flex flex-col lg:flex-row gap-y-8 border-t border-black">
          <DetailBox title="5 Basic Words">
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
          <DetailBox title="Fave Coworking Space">
            <Link
              href={cheatsheet.faveCoworkingSpace.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cheatsheet.faveCoworkingSpace.name}
            </Link>
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
