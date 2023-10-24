"use client";
import { useState } from "react";
import { useDebounce } from "react-use";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

export default function Search() {
  const [clientSearchValue, setClientSearchValue] = useState<string>("");
  const [serverSearchValue, setServerSearchValue] = useState<string>("");

  const [, _] = useDebounce(
    () => {
      setServerSearchValue(clientSearchValue);
    },
    700,
    [clientSearchValue]
  );

  return (
    <>
      <SearchBar
        searchValue={clientSearchValue}
        onSearch={(value) => {
          setClientSearchValue(value);
          if (value === "") {
            setServerSearchValue(value);
          }
        }}
        onClear={() => setClientSearchValue("")}
      />
      <SearchResult searchValue={serverSearchValue} />
    </>
  );
}
