"use client";

import React, { Fragment } from "react";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";

import { Globe } from "@/icons/Globe";
import { AppLocale } from "@/types/global";
import { usePathname, useRouter } from "@/utils/navigation";

import { LanguageOption } from "./LanguageOption";

interface LocaleSelectorProps {
  copy: {
    optionEnglish: string;
    optionItalian: string;
  };
  currentLocale: AppLocale;
}

export const LocaleSelector: React.FC<LocaleSelectorProps> = ({
  currentLocale,
  copy,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const onChange = (newLocale: AppLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Popover className="relative">
      <PopoverButton className="flex gap-1 w-24">
        <Globe /> <span>{currentLocale === "en" ? "English" : "Italiano"}</span>
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <PopoverPanel className="absolute z-10 left-1/2 -translate-x-1/2 w-fit shadow-lg">
          <div className="absolute left-1/2 -translate-x-1/2 h-0 w-0 border-x-8 border-x-transparent border-b-[12px] border-b-white/40"></div>
          <div className="flex flex-col divide-y divide-gray-100 rounded-md bg-white/40 mt-3">
            <LanguageOption
              locale="en"
              text={copy.optionEnglish}
              active={currentLocale === "en"}
              onSelect={onChange}
            />
            <LanguageOption
              locale="it"
              text={copy.optionItalian}
              active={currentLocale === "it"}
              onSelect={onChange}
            />
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};
