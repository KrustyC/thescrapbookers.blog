"use client";

import { useEffect, useRef, useState } from "react";
import MuxVideo from "@mux/mux-video-react";
import Image from "next/legacy/image";

import { InstagramIcon } from "@/icons/Instagram";
import { PinterestIcon } from "@/icons/Pinterest";

const PLAYBACK_ID = "4nu02x0002c01H7btpNSvahcMcgj9XxZycSH2D01awYWUuMY";
const PLACEHOLDER_HASH =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAwL/xAAdEAACAgIDAQAAAAAAAAAAAAAAAQIDBBEFISIx/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIDAP/EABcRAQEBAQAAAAAAAAAAAAAAAAABEQL/2gAMAwEAAhEDEQA/AJ+NyMLX5KNd20SKceup+VooVTikHaXG9l+kJW5mn8G2oyRjOmtg0CBpW+wAVSGovo4mwA0T6f/Z";

const INSTAGRAM_URL = "https://www.instagram.com/the_scrapbookers_blog/";
const PINTEREST_URL = "https://www.pinterest.com/thescrapbookersblog/";

interface VideoProps {
  text: string;
  followText: string;
  pinterest: string;
  instagram: string;
}

const Video: React.FC<VideoProps> = ({
  text,
  followText,
  pinterest,
  instagram,
}) => {
  const [showText, setShowText] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setShowText(true);
          }, 150);
        }
      },
      { rootMargin: "-200px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full h-[70vh] lg:h-[650px] xl:h-[750px] 2xl:h-[850px]"
    >
      <Image
        src={PLACEHOLDER_HASH}
        alt="placeholder for ban sen video"
        title="placeholder for ban sen video"
        fill
      />

      <MuxVideo
        style={{
          height: "100%",
          maxWidth: "100%",
          position: "relative",
          zIndex: 0,
        }}
        playbackId={PLAYBACK_ID}
        metadata={{
          video_title: "Some videos with the drone",
        }}
        autoPlay
        loop
        muted
      />

      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/15 z-[1]" />

      <div className="absolute h-full w-full top-0 bottom-0 left-0 right-0 z-10 px-6 lg:px-16 xl:px-48 flex flex-col justify-center">
        {showText && (
          <div className="md:w-4/5 2xl:w-3/5 4xl:w-1/2">
            <h2 className="animate-title-appear text-white text-[80px] lg:text-8xl leading-[4.5rem] lg:leading-[5.5rem] font-medium uppercase font-league-gothic [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]">
              {text.split(" ").map((word, i) => (
                <span
                  className="blur-[4px] opacity-0 inline-block animate-text-appear"
                  key={i}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </h2>

            <div
              className="mt-8 opacity-0 animate-text-appear"
              style={{ animationDelay: "0.8s" }}
            >
              <p className="text-white text-lg mb-8 [text-shadow:_0_1px_4px_rgba(0,0,0,0.5)]">
                {followText}
              </p>
              <div className="flex gap-4">
                <a
                  href={PINTEREST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-full transition-colors"
                >
                  <PinterestIcon className="w-5 h-5 fill-current" />
                  {pinterest}
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-full transition-colors"
                >
                  <InstagramIcon className="w-5 h-5 fill-current" />
                  {instagram}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
