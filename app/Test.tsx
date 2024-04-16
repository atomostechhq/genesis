"use client";
import React from "react";
import { useAppContext } from "./context";
import Link from "next/link";

const Test = () => {
  const { color, colors, setColor } = useAppContext();
  console.log("color", color);
  const handleColorChange = (e: any) => {
    setColor(e.target.value);
  };

  return (
    <div className={["m-5", color && `theme-${color}`].join(" ")}>
      <div>
        <label className="block mt-5">Select a color:</label>
        <div className="flex justify-between space-x-8 mt-2">
          {colors?.map((c: any) => (
            <label
              key={c}
              className={`${
                color === c ? "bg-primary-100 text-primary-700 ring-4" : ""
              } h-20 w-full justify-center items-center flex-wrap font-bold uppercase cursor-pointer text-[12px]`}
            >
              <input
                type="radio"
                value={c}
                checked={color === c}
                onChange={handleColorChange}
                className="hidden"
              />
              {c}
            </label>
          ))}
        </div>
      </div>
      <div
        className={[
          "flex gap-4 items-center mt-5",
          color && `theme-${color}`,
        ].join(" ")}
      >
        <span className="bg-primary-25">{color} Primary 25</span>
        <span className="bg-primary-50">{color} Primary 50</span>
        <span className="bg-primary-100">{color} Primary 100</span>
        <span className="bg-primary-200">{color} Primary 200</span>
        <span className="bg-primary-300">{color} Primary 300</span>
        <span className="bg-primary-400">{color} Primary 400</span>
        <span className="bg-primary-500">{color} Primary 500</span>
        <span className="bg-primary-600">{color} Primary 600</span>
        <span className="bg-primary-700">{color} Primary 700</span>
        <span className="bg-primary-800">{color} Primary 800</span>
        <span className="bg-primary-900">{color} Primary 900</span>
      </div>

      <div className="mt-10 flex gap-10">
        <section>
          <h1 className="text-primary-400 border-b border-primary-900 w-fit">Typography - Font Size</h1>
          <h1 className="text-display-2xl">Display 2xl</h1>
          <h1 className="text-display-xl">Display xl</h1>
          <h1 className="text-display-lg">Display lg</h1>
          <h1 className="text-display-md">Display md</h1>
          <h1 className="text-display-sm">Display sm</h1>
          <h1 className="text-display-xs">Display xs</h1>
        </section>
        <section>
          <h1 className="text-primary-400 border-b border-primary-900 w-fit">Typography - Font Weight</h1>
          <h1 className="font-regular">Regular</h1>
          <h1 className="font-medium">Medium</h1>
          <h1 className="font-semibold">Semi Bold</h1>
          <h1 className="font-bold">Bold</h1>
        </section>
      </div>
    </div>
  );
};

export default Test;
