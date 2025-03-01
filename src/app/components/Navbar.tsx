"use client";

import { useState } from "react";

export default function Navbar({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) {
  return (
    <div className="flex justify-around bg-[#121111] pt-[27px] pl-[10px] pr-[10px]">
      {categories.map((category) => (
        <button
          key={category}
          className={`text-[14px] cursor-pointer px-[15px] rounded-2xl py-[9px] ${
            selectedCategory === category
              ? "bg-[#F9D03F] text-gray-950 font-normal"
              : "text-[#696969]"
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}
