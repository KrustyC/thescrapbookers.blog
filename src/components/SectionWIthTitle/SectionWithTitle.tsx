import { PropsWithChildren } from "react";

interface SectionWithTitleProps {
  title: string;
  greyBackground?: boolean;
}

export const SectionWithTitle: React.FC<
  PropsWithChildren<SectionWithTitleProps>
> = ({ title, greyBackground = false, children }) => {
  return (
    <section
      className={`flex flex-col py-16 lg:py-20 px-6 lg:px-16 xl:px-48 w-fit ${
        greyBackground ? "bg-gray-100" : "bg-white"
      }`}
    >
      <h2 className="text-5xl font-semibold mb-12 border-b-8 border-primary w-fit">
        {title}
      </h2>

      <div>{children}</div>
    </section>
  );
};
