"use client";
import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

export default function Search() {
  const [clientSearchValue, setClientSearchValue] = useState<string>("");
  const [serverSearchValue, setServerSearchValue] = useState<string>("");

  const [, cancel] = useDebounce(
    () => {
      setServerSearchValue(clientSearchValue);
    },
    2000,
    [clientSearchValue]
  );

  return (
    <>
      <SearchBar
        searchValue={clientSearchValue}
        onSearch={(value) => setClientSearchValue(value)}
        onClear={() => setClientSearchValue("")}
      />
      <SearchResult searchValue={serverSearchValue} />
    </>
  );
}
