import { PropsWithChildren } from "react";
import classNames from "classnames";

interface LoadingSectionWithTitleProps {
  primaryBackground?: boolean;
}

export const LoadingSectionWithTitle: React.FC<
  PropsWithChildren<LoadingSectionWithTitleProps>
> = ({ primaryBackground = false, children }) => {
  return (
    <section
      className={classNames(
        "flex flex-col py-8 md:py-16 lg:py-20 px-6 lg:px-16 xl:px-48 w-full",
        {
          "bg-white": !primaryBackground,
          "bg-primary": primaryBackground,
        }
      )}
    >
      <div
        className={classNames("w-2/3 my-4 animate-pulse h-10 pulse", {
          "bg-gray-300": !primaryBackground,
          "bg-white": primaryBackground,
        })}
      />

      <div
        className={classNames("border-b-4 rounded-full w-2/3 mb-8 lg:mb-12", {
          "border-primary": !primaryBackground,
          "border-white": primaryBackground,
        })}
      />

      <div>{children}</div>
    </section>
  );
};
