"use client";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

type Props = {
  videoTrailer: any;
};

export default function GameTrailer({ videoTrailer }: Props) {

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    // height: "390",
    // width: "640",
    playerVars: {
      autoplay: 1,
    },
    
  };

  return (
      <div className="grid grid-cols-1 gap-6 mx-2 mb-5">
        <YouTube videoId={videoTrailer.id} opts={opts} onReady={onPlayerReady} iframeClassName="w-full" />
      </div>
  );
}
