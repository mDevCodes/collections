"use client";
import React from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

export default function Search() {
  const [searchValue, setSearchValue] = React.useState<string>("");

  return (
    <>
      <SearchBar onSearch={(value) => setSearchValue(value)} />
      <SearchResult searchValue={searchValue} />
    </>
  );
}
