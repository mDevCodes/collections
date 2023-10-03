"use client";
import React from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

export default function Search() {
  const [searchValue, setSearchValue] = React.useState<string>("");

  return (
    <>
      <SearchBar
        searchValue={searchValue}
        onSearch={(value) => setSearchValue(value)}
        onClear={() => setSearchValue("")}
      />
      <SearchResult searchValue={searchValue} />
    </>
  );
}
