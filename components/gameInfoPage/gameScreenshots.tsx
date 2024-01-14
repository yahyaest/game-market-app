"use client";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type Props = {
  screenshots: string[];
};

export default function GameScreenshot({ screenshots }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6">
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
