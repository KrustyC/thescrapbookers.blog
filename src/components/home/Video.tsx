"use client";

import MuxVideo from "@mux/mux-video-react";

import { leagueGothic } from "@/utils/fonts";

const PLAYBACK_ID = "tOV00Jf00oWm2Nw02tq3OAVaUa6Gv8xUQ3mkmuWVyiizDI";
const PLACEHOLDER_HASH =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAwL/xAAdEAACAgIDAQAAAAAAAAAAAAAAAQIDBBEFISIx/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIDAP/EABcRAQEBAQAAAAAAAAAAAAAAAAABEQL/2gAMAwEAAhEDEQA/AJ+NyMLX5KNd20SKceup+VooVTikHaXG9l+kJW5mn8G2oyRjOmtg0CBpW+wAVSGovo4mwA0T6f/Z";

const Video: React.FC = () => {
  return (
    <div className="relative w-full h-[70vh] lg:h-[650px] xl:h-[750px]">
      <MuxVideo
        className="w-full h-full absolute top-0 left-0 object-cover"
        autoPlay
        muted
        poster={PLACEHOLDER_HASH}
        loop
        playbackId={PLAYBACK_ID}
        placeholder={PLACEHOLDER_HASH}
        metadata={{
          video_title: "A video of Ban Sen",
        }}
      />
      <div className="absolute h-full w-full top-0 bottom-0 left-0 right-0 z-50 px-6 lg:px-16 xl:px-48 flex items-center">
        <h2
          style={leagueGothic.style}
          className="text-6xl lg:text-9xl text-white font-bold md:w-2/3 uppercase"
        >
          Digital Nomading, the sustainable way
        </h2>
      </div>
    </div>
  );
};

export default Video;
