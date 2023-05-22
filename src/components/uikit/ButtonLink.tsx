import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import Link from "next/link";

interface ButtonLinkProps {
  href: string;
  variant: "white" | "black";
  target?: "_blank";
  type?: "button" | "submit";
}

export const ButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  href,
  target,
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
        "flex items-center justify-center rounded-2xl font-light h-16 min-w-32 px-12 w-fit",
        {
          "bg-white text-black": variant === "white",
          "bg-black text-white": variant === "black",
        }
      )}
    >
      {children}
    </Link>
  );
};
