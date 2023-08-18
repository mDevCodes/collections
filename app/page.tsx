"use client";

import SearchBar from "@/components/SearchBar";
import React from "react";

export default function Home() {
  const [albumSearch, setAlbumSearch] = React.useState<string>("");

  return (
    <main className="flex flex-col items-center justify-center ">
      <SearchBar onChange={(value: string) => setAlbumSearch(value)} />
      <h1 className="font-bold text-6xl mt-10">Home Page</h1>
    </main>
  );
}
