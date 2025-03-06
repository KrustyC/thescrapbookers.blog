import React, { PropsWithChildren } from "react";
import classNames from "classnames";

import { Link } from "@/i18n/navigation";

interface ButtonLinkProps {
  href: string;
  size?: "sm" | "md";
  variant: "white" | "black";
  target?: "_blank";
  type?: "button" | "submit";
  prefetch?: boolean;
}

export const ButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  href,
  target,
  size = "md",
  variant,
  prefetch = false,
  type = "button",
  children,
}) => {
  return (
    <Link
      href={href}
      target={target}
      prefetch={prefetch}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      type={type}
      className={classNames(
        "flex items-center justify-center font-light w-fit",
        {
          "bg-white text-black": variant === "white",
          "bg-black text-white": variant === "black",
        },
        {
          "text-sm lg:text-regular h-12 min-w-16 lg:min-w-24 w-full md:w-fit px-4 lg:px-8 rounded-lg":
            size === "sm",
          "h-16 min-w-32 w-full md:w-fit px-12 rounded-2xl": size === "md",
        }
      )}
    >
      {children}
    </Link>
  );
};
