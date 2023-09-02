"use client";
import React from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

export default function Search() {
  const [searchValue, setSearchValue] = React.useState<string>("");

  return (
    <div>
      <SearchBar onClick={(value: string) => setSearchValue(value)} />
      <SearchResult searchValue={searchValue} />
    </div>
  );
}
