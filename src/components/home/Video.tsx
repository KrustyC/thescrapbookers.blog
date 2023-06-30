"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import videojs from "video.js";

import { leagueGothic } from "@/utils/fonts";

import "video.js/dist/video-js.css";

const PLAYBACK_ID = "tOV00Jf00oWm2Nw02tq3OAVaUa6Gv8xUQ3mkmuWVyiizDI";
const PLACEHOLDER_HASH =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAwL/xAAdEAACAgIDAQAAAAAAAAAAAAAAAQIDBBEFISIx/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIDAP/EABcRAQEBAQAAAAAAAAAAAAAAAAABEQL/2gAMAwEAAhEDEQA/AJ+NyMLX5KNd20SKceup+VooVTikHaXG9l+kJW5mn8G2oyRjOmtg0CBpW+wAVSGovo4mwA0T6f/Z";

const Video = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
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

  return (
    <div className="relative w-full h-[70vh] lg:h-[650px] xl:h-[750px]">
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
          <h2
            style={leagueGothic.style}
            className="text-6xl lg:text-9xl text-white font-bold md:w-4/5 uppercase"
          >
          stories of travel, food, culture and digital nomading
          </h2>
        </div>
      )}
    </div>
  );
};

export default Video;
