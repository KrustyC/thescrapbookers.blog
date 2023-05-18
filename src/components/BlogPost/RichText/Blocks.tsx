import { Children, PropsWithChildren } from "react";
import Image from "next/image";
import { Block, Inline } from "@contentful/rich-text-types";
import parse from "html-react-parser";

export const Bold: React.FC<PropsWithChildren> = ({ children }) => (
  <span className="font-bold">{children}</span>
);

export const Text: React.FC<PropsWithChildren> = ({ children }) => {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length === 1 && childrenArray[0] === "") {
    return null;
  }

  return <p className="rich-text-copy mb-6">{children}</p>;
};

export const UnorderedList: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="rich-text-copy">
    <ul className="list-disc ml-6">{children}</ul>
  </div>
);

export const OrderedList: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="rich-text-copy">
    <ol className="list-decimal ml-6">{children}</ol>
  </div>
);

export const ListItem: React.FC<PropsWithChildren> = ({ children }) => (
  <li className="mb-4">{children}</li>
);

interface HyperlinkProps {
  href: string;
}

export const Hyperlink: React.FC<PropsWithChildren<HyperlinkProps>> = ({
  href,
  children,
}) => {
  return (
    <a className="text-sky-600 hover:underline" href={href} target="_blank">
      {children}
    </a>
  );
};

interface HeadingProps {
  size: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading: React.FC<PropsWithChildren<HeadingProps>> = ({
  children,
  size,
}) => {
  switch (size) {
    case 1:
      return <h1 className="rich-text-heading text-5xl">{children}</h1>;
    case 2:
      return <h2 className="rich-text-heading text-4xl">{children}</h2>;
    case 3:
      return <h3 className="rich-text-heading text-3xl">{children}</h3>;
    case 4:
      return <h4 className="rich-text-heading text-2xl">{children}</h4>;
    case 5:
      return <h5 className="rich-text-heading text-xl">{children}</h5>;
    case 4:
    default:
      return <h6 className="rich-text-heading text-lg">{children}</h6>;
  }
};

export const Asset: React.FC<{ block: Block | Inline }> = ({ block }) => {
  const file = block.data.target.fields.file;
  const url = `https:${file.url}`;
  const description = block.data.target.fields.description;

  if (file.contentType.startsWith("video/")) {
    return (
      <div className="mx-auto my-8 lg:my-16 loading-background w-full lg:w-[840px] aspect-video">
        <video controls>
          <source src={url} type="video/mp4" />
          Sorry, your browser doesn{"'"}t support videos.
        </video>
      </div>
    );
  }

  return (
    <div className="mx-auto my-8 lg:my-16">
      <Image
        className="loading-background"
        src={url}
        alt={
          description?.replace(/<\/?[^>]+(>|$)/g, "") || "image from the post"
        } // @TODO Check for descriptions
        height={file.details.image.height}
        width={file.details.image.width}
      />
      <span className="mt-2 mx-4 text-gray-600 text-sm italic">
        {parse(description)}
      </span>
    </div>
  );
};
