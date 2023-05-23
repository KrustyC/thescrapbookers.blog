import { PropsWithChildren } from "react";
import classNames from "classnames";

interface SectionWithTitleProps {
  title: string;
  primaryBackground?: boolean;
}

export const SectionWithTitle: React.FC<
  PropsWithChildren<SectionWithTitleProps>
> = ({ title, primaryBackground = false, children }) => {
  return (
    <section
      className={classNames(
        "flex flex-col py-16 lg:py-20 px-6 lg:px-16 xl:px-48 w-fit",
        {
          "bg-white": !primaryBackground,
          "bg-primary": primaryBackground,
        }
      )}
    >
      <h2
        className={classNames(
          "text-5xl font-semibold mb-12 border-b-8 w-fit text-black leading-[4.5rem]",
          {
            "border-white": primaryBackground,
            "border-primary": !primaryBackground,
          }
        )}
      >
        {title}
      </h2>

      <div>{children}</div>
    </section>
  );
};
