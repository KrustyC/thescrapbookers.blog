"use client";

import MuxPlayer from "@mux/mux-player-react";

const Video: React.FC = () => {
  return (
    <div className="min-h-[500px]">
      <MuxPlayer
        autoPlay
        nohotkeys
        muted
        loop
        noVolumePref
        defaultHiddenCaptions
        defaultShowRemainingTime={false}
        className="w-full bg-gray-200 -mb-2"
        streamType="on-demand"
        playbackId="tOV00Jf00oWm2Nw02tq3OAVaUa6Gv8xUQ3mkmuWVyiizDI"
        metadata={{
          video_title: "A video of Ban Sen",
        }}
      />
    </div>
  );
};

export default Video;
