"use client";

import MuxPlayer from "@mux/mux-player-react";

export const Video: React.FC = () => {
  return (
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
      playbackId="00lGJE5gxu024LMfOBxp5sEjfXEqvYLYbVOgA00Cl4xj400"
      metadata={{
        video_title: "A video of Ban Sen",
      }}
    />
  );
};
