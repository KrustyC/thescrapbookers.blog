import { PropsWithChildren } from "react";
import classNames from "classnames";

interface SectionWithTitleProps {
  title: string;
  primaryBackground?: boolean;
  withExtraMarginTop?: boolean;
}

export const SectionWithTitle: React.FC<
  PropsWithChildren<SectionWithTitleProps>
> = ({
  title,
  primaryBackground = false,
  withExtraMarginTop = false,
  children,
}) => {
  return (
    <section
      className={classNames(
        "flex flex-col pt-8 pb-16 md:py-16 lg:py-20 px-6 lg:px-16 xl:px-48",
        {
          "bg-white": !primaryBackground,
          "bg-primary": primaryBackground,
          "pt-16 md:py-16 lg:py-20": withExtraMarginTop,
        }
      )}
    >
      <h2
        className={classNames(
          "text-3xl lg:text-5xl font-semibold mb-8 lg:mb-12 border-b-4 lg:border-b-[6px] w-fit text-black lg:leading-[3.5rem]",
          {
            "border-primary": !primaryBackground,
            "border-white": primaryBackground,
          }
        )}
      >
        {title}
      </h2>

      <div>{children}</div>
    </section>
  );
};
