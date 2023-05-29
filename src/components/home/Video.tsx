"use client";

import MuxPlayer from "@mux/mux-player-react";

import { leagueGothic } from "@/utils/fonts";

const Video: React.FC = () => {
  return (
    <div className="relative w-screen aspect-square overflow-y-hidden lg:aspect-video -mb-[7px]">
      <MuxPlayer
        className="h-full w-full"
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
      <div className="absolute h-full w-full top-0 bottom-0 left-0 right-0 z-50 px-6 lg:px-16 xl:px-48 flex items-center">
        <h2
          style={leagueGothic.style}
          className="text-9xl text-white font-bold w-2/3 uppercase"
        >
          We are young, we are strong, we are The Scrapbookers...
        </h2>
      </div>
    </div>
  );
};

export default Video;
