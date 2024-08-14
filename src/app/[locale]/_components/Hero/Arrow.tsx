"use client";

import Link from "next/link";

import { ChevronDown } from "@/icons/ChevronDown";

export const Arrow = () => {
  return (
    <Link
      href="#featured-articles"
      className="absolute bottom-5 left-0 w-full flex justify-center items-center cursor-pointer z-50"
    >
      <div className="bg-black bg-opacity-80 text-white text-center p-2 rounded-full">
        <ChevronDown className="size-4 text-white" />
      </div>
    </Link>
  );
};
