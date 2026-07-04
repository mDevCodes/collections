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
    <div className="relative mb-[34px] mt-[18px]">
      <Icon
        type="search"
        className="pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2 text-muted"
        size="small"
      />
      <input
        id="search"
        type="text"
        placeholder="Search for your favorite records"
        className="w-full rounded-full border border-field-border bg-field py-[15px] pl-[50px] pr-12 font-body text-[16px] text-text outline-none"
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
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        >
          <Icon type="clear" size="small" />
        </button>
      ) : null}
    </div>
  );
}
