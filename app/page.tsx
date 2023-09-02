import React from "react";
import Search from "../components/Search";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center ">
      <h1 className="font-bold text-6xl mt-10">Home Page</h1>
      <Search />
    </main>
  );
}
