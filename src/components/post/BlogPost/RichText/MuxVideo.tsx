"use client";

import MuxVideoReact from "@mux/mux-video-react";
import classNames from "classnames";

import { Video } from "@/types/global";

interface MuxVideoProps {
  video: Video;
}

const MuxVideo: React.FC<MuxVideoProps> = ({ video }) => {
  return (
    <div className="flex items-center flex-col gap-2 mx-auto my-12">
      <div
        className={classNames("relative", {
          "w-screen lg:w-[760px] aspect-video": video.ratio === "16:9",
          "w-screen md:w-[320px] aspect-[9/16]": video.ratio === "9:16",
        })}
      >
        <MuxVideoReact
          style={{ height: "100%", maxWidth: "100%" }}
          playbackId={video.playbackId}
          controls
          autoPlay={false}
          muted
        />
      </div>

      <div
        className={classNames("relative", {
          "w-full lg:w-[760px] xl:w-[800px]": video.ratio === "16:9",
          "w-full lg:w-[420px] xl:w-[450px]": video.ratio === "9:16",
        })}
      >
        <p className="px-4 md:px-0 text-gray-600 text-xs italic">{video.description}</p>
      </div>
    </div>
  );
};

export default MuxVideo;
