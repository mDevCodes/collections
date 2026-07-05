import React from "react";
import Search from "@/components/Search";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <main className="mx-auto max-w-[1160px] px-[18px] pb-24 pt-6 dt:px-8 dt:pb-20 dt:pt-10">
      <h1 className="font-display text-[clamp(30px,5.5vw,42px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-text">
        Search
      </h1>
      <Search initialQuery={searchParams.q ?? ""} />
    </main>
  );
}
