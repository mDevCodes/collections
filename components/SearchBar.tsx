"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const [userInput, setUserInput] = useState("");
  return (
    <div className="flex gap-2 w-full mt-10 relative">
      <Icon
        type="search"
        className="absolute top-[11px] left-3.5 text-black"
        size="xsmall"
      />
      <input
        id="search"
        type="text"
        placeholder="Search for your favorite records"
        className="grow pl-10 py-2 rounded-xl text-black"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button
        onClick={() => onSearch(userInput)}
        className="px-2 border-2 border-gray-800 rounded-xl"
      >
        Search
      </button>
    </div>
  );
}
