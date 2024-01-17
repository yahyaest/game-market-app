"use client";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type Props = {
  screenshots: string[];
};

export default function GameScreenshot({ screenshots }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 mx-2 sm:grid-cols-2 sm:mx-1">
      <PhotoProvider>
        {screenshots.map((screenshot: string) => (
          <PhotoView key={screenshot} src={screenshot}>
            <img src={screenshot} alt={screenshot} className="cursor-pointer" />
          </PhotoView>
        ))}
      </PhotoProvider>
    </div>
  );
}
