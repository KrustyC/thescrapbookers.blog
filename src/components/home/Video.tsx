"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import videojs from "video.js";

import "video.js/dist/video-js.css";

const PLAYBACK_ID = "tOV00Jf00oWm2Nw02tq3OAVaUa6Gv8xUQ3mkmuWVyiizDI";
const PLACEHOLDER_HASH =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAwL/xAAdEAACAgIDAQAAAAAAAAAAAAAAAQIDBBEFISIx/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIDAP/EABcRAQEBAQAAAAAAAAAAAAAAAAABEQL/2gAMAwEAAhEDEQA/AJ+NyMLX5KNd20SKceup+VooVTikHaXG9l+kJW5mn8G2oyRjOmtg0CBpW+wAVSGovo4mwA0T6f/Z";

interface VideoProps {
  text: string;
}

const Video: React.FC<VideoProps> = ({ text }) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showText, setShowText] = useState(false);

  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const videJsOptions = {
        autoplay: true,
        controls: false,
        responsive: true,
        loop: true,
        muted: true,
        fill: true,
        sources: [
          {
            src: `https://stream.mux.com/${PLAYBACK_ID}.m3u8`,
            type: "application/x-mpegURL",
          },
        ],
      };

      videojs(videoRef.current, videJsOptions, () => {
        setIsPlayerReady(true);
      });
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isPlayerReady) {
          setTimeout(() => {
            setShowText(true);
          }, 150);
        }
      },
      { rootMargin: "-200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isPlayerReady]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] lg:h-[650px] xl:h-[750px]"
    >
      <video ref={videoRef} className="video-js" />

      {!isPlayerReady ? (
        <Image
          fill
          style={{ objectFit: "cover" }}
          className="w-full h-full absolute top-0 left-0 object-cover"
          src={PLACEHOLDER_HASH}
          alt="Placeholder image"
        />
      ) : (
        <div className="absolute h-full w-full top-0 bottom-0 left-0 right-0 z-10 px-6 lg:px-16 xl:px-48 flex items-center">
          {showText && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default Video;
