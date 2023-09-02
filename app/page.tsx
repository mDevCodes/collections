"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import SearchResult from "../components/SearchResult";

export default function Home() {
  const [searchValue, setSearchValue] = React.useState<string>("");

  return (
    <main className="flex flex-col items-center justify-center ">
      <SearchBar onChange={(value) => setSearchValue(value)} />
      <h1 className="font-bold text-6xl mt-10">Home Page</h1>
      <SearchResult search={searchValue} />
    </main>
  );
}
