"use client";

import React, { useState } from "react";

const MultiSlider = () => {
  const [values, setValues] = useState<[number, number]>([0, 100]);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const thumb2Ref = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const newValue = Math.round(
      ((e.clientX - sliderRect.left) / sliderRect.width) * 100,
    );

    if (newValue < 0 || newValue > 100) {
      return;
    }

    if (Math.abs(values[0] - newValue) < Math.abs(values[1] - newValue)) {
      setValues([newValue, values[1]]);
    } else {
      setValues([values[0], newValue]);
    }
  };

  const handleThumbMove = (e: MouseEvent) => {
    e.stopPropagation();
    if (!sliderRef.current || !thumbRef.current) return;
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const newValue = Math.round(
      ((e.clientX - sliderRect.left) / sliderRect.width) * 100,
    );

    if (newValue < 0 || newValue > 100) {
      return;
    }

    //    Check for maximum and minimum values
    if (thumbRef.current === e.target) {
      if (newValue < values[1]) {
        setValues([newValue, values[1]]);
      }
    } else if (thumb2Ref.current === e.target) {
      if (newValue > values[0]) {
        setValues([values[0], newValue]);
      }
    }
  };

  return (
    <div
      className="relative flex h-1 w-full items-center justify-between bg-gray-200"
      onMouseDown={handleMouseDown}
      ref={sliderRef}
    >
      <div
        className="absolute h-1 bg-primary"
        style={{
          left: `${values[0]}%`,
          right: `${100 - values[1]}%`,
        }}
      ></div>
      <div
        className="absolute h-4 w-4 rounded-full bg-primary-500"
        style={{
          left: `${values[0]}%`,
        }}
        ref={thumbRef}
        onMouseDown={(e) => {
          e.preventDefault();
          window.addEventListener("mousemove", handleThumbMove);
          window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", handleThumbMove);
          });
        }}
      ></div>
      <div
        className="absolute h-4 w-4 rounded-full bg-primary-500"
        style={{
          right: `${100 - values[1]}%`,
        }}
        ref={thumb2Ref}
        onMouseDown={(e) => {
          e.preventDefault();
          window.addEventListener("mousemove", handleThumbMove);
          window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", handleThumbMove);
          });
        }}
      ></div>
    </div>
  );
};

export default MultiSlider;
