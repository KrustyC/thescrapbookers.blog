"use client";

import MuxVideoReact from "@mux/mux-video-react";
import classNames from "classnames";

import { Video } from "@/types/global";

interface MuxVideoProps {
  video: Video;
}

// @TODO This is just generic, it should be changed at some poitn
// const PLACEHOLDER_HASH =
//   "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAwL/xAAdEAACAgIDAQAAAAAAAAAAAAAAAQIDBBEFISIx/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIDAP/EABcRAQEBAQAAAAAAAAAAAAAAAAABEQL/2gAMAwEAAhEDEQA/AJ+NyMLX5KNd20SKceup+VooVTikHaXG9l+kJW5mn8G2oyRjOmtg0CBpW+wAVSGovo4mwA0T6f/Z";

// const LANDSCAPE_ASPECT_RATIOS = ["16:9", "455:256"];
const PORTRAIT_ASPECT_RATIOS = ["9:16"];

const MuxVideo: React.FC<MuxVideoProps> = ({ video }) => {
  const isPortrait = PORTRAIT_ASPECT_RATIOS.includes(video.ratio);
  const isLandscape = !isPortrait;

  return (
    <div className="flex items-center flex-col gap-2 mx-auto my-12">
      <div
        className={classNames("bg-gray-200 relative", {
          "w-screen lg:w-[760px] xl:w-[800px] aspect-video": isLandscape,
          "w-screen md:w-[320px] xl:w-[450px] aspect-9/16": isPortrait,
        })}
      >
        <MuxVideoReact
          // placeholder={PLACEHOLDER_HASH}
          style={{ height: "100%", maxWidth: "100%" }}
          playbackId={video.playbackId}
          controls
          autoPlay={false}
          muted
        />
      </div>

      <div
        className={classNames("relative", {
          "w-full lg:w-[760px] xl:w-[800px]": isLandscape,
          "w-full lg:w-[420px] xl:w-[450px]": isPortrait,
        })}
      >
        <p className="px-4 md:px-0 text-gray-600 text-xs italic">
          {video.description}
        </p>
      </div>
    </div>
  );
};

export default MuxVideo;
