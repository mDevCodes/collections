"use client";

import Icon from "./Icon";
import { useRef } from "react";

export default function SearchBar({
  searchValue,
  onSearch,
  onClear,
}: {
  searchValue: string;
  onSearch: (value: string) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex gap-2 w-full mt-10 mb-10 lg:mb-14 lg:mt-14 relative">
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
        onChange={(e) => onSearch(e.target.value)}
        value={searchValue}
        ref={inputRef}
      />
      {searchValue ? (
        <button
          onClick={() => {
            onClear();
            inputRef.current?.focus();
          }}
        >
          <Icon
            type="clear"
            className="absolute top-2.5 right-24 text-black"
            size="small"
          />
        </button>
      ) : null}

      <button className="px-2 border-2 border-gray-800 rounded-xl">
        Search
      </button>
    </div>
  );
}
