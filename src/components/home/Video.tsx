"use client";

import MuxPlayer from "@mux/mux-player-react";

const Video: React.FC = () => {
  return (
    <div className="h-[500px] mb-8 max-w-screen md:w-screen md:h-screen">
      <MuxPlayer
        autoPlay
        nohotkeys
        muted
        loop
        noVolumePref
        defaultShowRemainingTime={false}
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
