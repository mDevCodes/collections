"use client";

import Icon from "./Icon";

export default function SearchBar({
  onClick,
}: {
  onClick: (value: string) => void;
}) {
  return (
    <div className="m-auto w-3/4 flex justify-center mt-10 relative">
      <Icon
        type="search"
        className="absolute top-5 left-16 text-black"
        size="small"
      />
      <input
        id="search-input"
        type="text"
        placeholder="Search for your favorite records"
        className="w-5/6 p-3 pl-14 rounded-full text-black"
      />
      <button
        onClick={(e) => onClick("flume")}
        className="ml-8 p-4 border-2 rounded-full"
      >
        Search
      </button>
    </div>
  );
}
