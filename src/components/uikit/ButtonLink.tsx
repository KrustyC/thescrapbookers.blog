import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import Link from "next/link";

interface ButtonLinkProps {
  href: string;
  size?: "sm" | "md";
  variant: "white" | "black";
  target?: "_blank";
  type?: "button" | "submit";
}

export const ButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  href,
  target,
  size = "md",
  variant,
  type = "button",
  children,
}) => {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      type={type}
      className={classNames(
        "flex items-center justify-center  font-light w-fit",
        {
          "bg-white text-black": variant === "white",
          "bg-black text-white": variant === "black",
        },
        {
          "h-12 min-w-24 px-8 rounded-xl": size === "sm",
          "h-16 min-w-32 px-12 rounded-2xl": size === "md",
        }
      )}
    >
      {children}
    </Link>
  );
};
