"use client";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

export default function Search() {
  const [clientSearchValue, setClientSearchValue] = useState<string>("");
  const [serverSearchValue, setServerSearchValue] = useState<string>("");

  useEffect(() => {
    const debouncedSearch = debounce(
      () => setServerSearchValue(clientSearchValue),
      2000
    );
    debouncedSearch.cancel();
  }, [clientSearchValue]);

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
