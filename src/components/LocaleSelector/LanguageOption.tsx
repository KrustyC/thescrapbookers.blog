import React from "react";
import classNames from "classnames";

import { AppLocale } from "@/types/global";

interface LanguageOptionProps {
  active: boolean;
  text: string;
  locale: AppLocale;
  onSelect: (newLocale: AppLocale) => void;
}

export const LanguageOption: React.FC<LanguageOptionProps> = ({
  text,
  active,
  locale,
  onSelect,
}) => {
  const onClick = () => onSelect(locale);

  return (
    <span
      role="button"
      tabIndex={0}
      className={classNames(
        "px-4 py-2 first:rounded-t-md last:rounded-b-md focus:text-black/70 hover:bg-white/70 hover:text-black/70 transition-all",
        {
          "bg-white/50": active,
          "bg-transparent": !active,
        }
      )}
      onClick={onClick}
    >
      {text}
    </span>
  );
};
