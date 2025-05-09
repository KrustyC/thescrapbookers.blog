"use client";

import { useEffect, useRef, useState } from "react";
import MuxVideo from "@mux/mux-video-react";
import Image from "next/image";

const PLAYBACK_ID = "4nu02x0002c01H7btpNSvahcMcgj9XxZycSH2D01awYWUuMY";
const PLACEHOLDER_HASH =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAwL/xAAdEAACAgIDAQAAAAAAAAAAAAAAAQIDBBEFISIx/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIDAP/EABcRAQEBAQAAAAAAAAAAAAAAAAABEQL/2gAMAwEAAhEDEQA/AJ+NyMLX5KNd20SKceup+VooVTikHaXG9l+kJW5mn8G2oyRjOmtg0CBpW+wAVSGovo4mwA0T6f/Z";

interface VideoProps {
  text: string;
}

const Video: React.FC<VideoProps> = ({ text }) => {
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
        style={{ height: "100%", maxWidth: "100%" }}
        playbackId={PLAYBACK_ID}
        metadata={{
          video_title: "Some videos with the drone",
        }}
        autoPlay
        loop
        muted
      />

      <div className="absolute h-full w-full top-0 bottom-0 left-0 right-0 z-10 px-6 lg:px-16 xl:px-48 flex items-center">
        {showText && (
          <h2 className="scale-[0.94] animate-title-appear md:w-4/5 2xl:w-3/5 4xl:w-1/2 text-white/80 text-[80px] lg:text-8xl leading-[4.5rem] lg:leading-[5.5rem] font-medium uppercase font-league-gothic ">
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
        )}
      </div>
    </div>
  );
};

export default Video;
