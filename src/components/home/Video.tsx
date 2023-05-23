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
      playbackId="nxCCwFBmmiMRxKFPlOMOtkYea29hWEHgSDbj02QfvNC4"
      metadata={{
        video_title: "A video of Ban Sen",
      }}
    />
  );
};
