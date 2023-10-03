"use client";
import React from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

export default function Search() {
  const [searchValue, setSearchValue] = React.useState<string | null>(null);

  return (
    <>
      <SearchBar
        searchValue={searchValue}
        onInput={(value) => setSearchValue(value)}
        onClear={() => setSearchValue(null)}
      />
      <SearchResult searchValue={searchValue} />
    </>
  );
}
