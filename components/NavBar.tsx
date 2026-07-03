"use client";
import Link from "next/link";
import LoginStatus from "./LoginStatus";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-black/40 border-b border-gray-800">
      <div className="flex justify-between items-center max-w-4xl mx-auto px-4 py-3">
        <Link href="/">
          <h1 className="text-2xl font-heading">Collections</h1>
        </Link>
        <LoginStatus />
      </div>
    </header>
  );
}
