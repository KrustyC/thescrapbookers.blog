"use client";

import { useEffect, useRef, useState } from "react";
// import MuxPlayer from "@mux/mux-player-react";
// import MuxVideo from "@mux/mux-video-react";
import Image from "next/image";

// const PLAYBACK_ID = "tOV00Jf00oWm2Nw02tq3OAVaUa6Gv8xUQ3mkmuWVyiizDI";
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
      className="relative w-full h-[70vh] lg:h-[650px] xl:h-[750px]"
    >
      <Image src={PLACEHOLDER_HASH} alt="placeholder for ban sen video" fill />

      {/* <MuxPlayer
        // style={{ height: "100%", maxWidth: "100%" }}
        onEnded={() => console.log("video ended")}
        // placeholder={PLACEHOLDER_HASH}
        playbackId={PLAYBACK_ID}
        streamType="on-demand"
        metadata={{
          video_title: "View of Ban Sen (Vietnam) from a drone",
        }}
        autoPlay
        loop
        muted
      /> */}

      {/* <MuxVideo
        style={{ height: "100%", maxWidth: "100%" }}
        playbackId={PLAYBACK_ID}
        metadata={{
          video_title: "View of Ban Sen (Vietnam) from a drone",
        }}
        autoPlay
        loop
        muted
      /> */}

      {showText && (
        <div className="absolute h-full w-full top-0 bottom-0 left-0 right-0 z-10 px-6 lg:px-16 xl:px-48 flex items-center">
          <h2 className="scale-[0.94] animate-title-appear text-6xl lg:text-9xl text-white font-bold md:w-4/5 uppercase text-white/80 font-league-gothic">
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
        </div>
      )}
    </div>
  );
};

export default Video;
