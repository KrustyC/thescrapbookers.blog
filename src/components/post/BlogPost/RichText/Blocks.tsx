import { Children, PropsWithChildren } from "react";
import parse from "html-react-parser";
import Image from "next/image";

import { RichTextAsset } from "@/types/global";

export const Bold: React.FC<PropsWithChildren> = ({ children }) => (
  <span className="font-bold">{children}</span>
);

export const Blockquote: React.FC<PropsWithChildren> = ({ children }) => (
  <div
    className="w-full lg:w-fit lg:mx-auto bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
    role="alert"
  >
    {children}
  </div>
);

export const Alert: React.FC<PropsWithChildren> = ({ children }) => (
  <div
    className="w-full lg:w-fit lg:mx-auto p-4 bg-red-100 text-gray-700 shadow-md rounded-xl text-lg"
    role="alert"
  >
    {children}
  </div>
);

export const Text: React.FC<PropsWithChildren> = ({ children }) => {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length === 1 && childrenArray[0] === "") {
    return null;
  }

  return <p className="rich-text-copy mb-2">{children}</p>;
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
  <li className="mb-2 text-lg">{children}</li>
);

interface HyperlinkProps {
  uri: string;
}

const YOUTUBE_VIDEO_ID_REGEX =
  /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

export const Hyperlink: React.FC<PropsWithChildren<HyperlinkProps>> = ({
  uri,
  children,
}) => {
  // Only process youtube links
  if (uri.includes("youtube.com")) {
    // Extract videoId from the URL
    const match = YOUTUBE_VIDEO_ID_REGEX.exec(uri);
    const videoId = match && match[7].length === 11 ? match[7] : null;

    return (
      videoId && (
        <section className="w-full aspect-video mt-8">
          <iframe
            className="w-full h-full"
            title={`https://youtube.com/embed/${videoId}`}
            src={`https://youtube.com/embed/${videoId}`}
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen={false}
          />
        </section>
      )
    );
  }

  return (
    <a
      className="text-primary hover:underline"
      href={uri}
      target="_blank"
      rel="noreferrer"
    >
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
      return (
        <h1 className="rich-text-heading text-5xl font-poppins">{children}</h1>
      );
    case 2:
      return (
        <h2 className="rich-text-heading text-4xl mt-12 font-poppins">
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className="rich-text-heading text-3xl font-poppins">{children}</h3>
      );
    case 4:
      return (
        <h4 className="rich-text-heading text-2xl font-poppins">{children}</h4>
      );
    case 5:
      return (
        <h5 className="rich-text-heading text-xl font-poppins">{children}</h5>
      );
    case 4:
    default:
      return (
        <h6 className="rich-text-heading text-lg font-poppins">{children}</h6>
      );
  }
};

export const Asset: React.FC<{ asset: RichTextAsset }> = ({ asset }) => {
  const url = asset.url;
  const title = asset.title;
  const description = asset.description;

  if (!url) {
    return null;
  }

  if (asset.contentType?.startsWith("video/")) {
    return (
      <div className="relative mx-auto my-8 lg:my-16 loading-background w-full lg:w-[840px] aspect-video">
        <video
          controls
          className="w-full h-full absolute top-0 left-0 object-cover"
        >
          <source src={url} type="video/mp4" />
          Sorry, your browser doesn{"'"}t support videos.
        </video>
      </div>
    );
  }

  return (
    <div
      className="mx-auto my-8 lg:my-16"
      style={{ width: `${asset.width}px` }}
    >
      <Image
        className="loading-background"
        src={url}
        alt={
          description?.replace(/<\/?[^>]+(>|$)/g, "") || "image from the post"
        } // @TODO Check for descriptions
        height={asset.height}
        width={asset.width}
      />
      {title ? (
        <span className="mt-2 mx-4 text-gray-600 text-sm italic">
          {parse(title)}
        </span>
      ) : null}
    </div>
  );
};
