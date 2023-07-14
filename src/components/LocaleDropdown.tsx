"use client";

import { Menu } from "@headlessui/react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { usePathname } from "next-intl/client";

import { AppLocale } from "@/types/global";

interface LocaleDropdownProps {
  helpText: string;
  currentLocale: AppLocale;
}

// export const LocaleSwitch: React.FC<LocaleSwitchProps> = ({
//   helpText,
//   currentLocale,
// }) => {
//   const isItalian = currentLocale === "it";
//   const router = useRouter();
//   const pathname = usePathname();

//   const onToggle = () => {
//     const nextLocale = currentLocale === "it" ? "en" : "it";
//     router.replace(`/${nextLocale}${pathname}`);
//   };

//   return (
//     <Switch
//       checked={isItalian}
//       onChange={onToggle}
//       className={classNames(
//         "relative inline-flex items-center h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-background duration-600 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 bg-gray-200"
//       )}
//     >
//       <span aria-hidden="true" className="sr-only">
//         {helpText}
//       </span>
//       <span
//         className={classNames(
//           "bg-cover bg-center bg-no-repeat border border-gray-500 pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-600 ease-in-out",
//           {
//             "translate-x-[26px] bg-ita-flag": isItalian,
//             "translate-x-0 bg-uk-flag": !isItalian,
//           }
//         )}
//       />
//     </Switch>
//   );
// };

export const LocaleDropdown: React.FC<LocaleDropdownProps> = ({
  currentLocale,
}) => {
  const isItalian = currentLocale === "it";
  const router = useRouter();
  const pathname = usePathname();

  const onToggle = () => {
    const nextLocale = currentLocale === "it" ? "en" : "it";
    router.replace(`/${nextLocale}${pathname}`);
  };

  return (
    <Menu>
      <Menu.Button>More</Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && "bg-blue-500"}`}
              href="/account-settings"
            >
              English
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && "bg-blue-500"}`}
              href="/account-settings"
            >
              Italiano
            </a>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className="opacity-75">Invite a friend (coming soon!)</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};