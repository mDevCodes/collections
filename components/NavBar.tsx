"use client";
import Link from "next/link";
import LoginStatus from "./LoginStatus";

export default function NavBar() {
  return (
    <header
      className={`flex justify-between items-center border-b border-gray-800 p-4`}
    >
      <Link href="/">
        <h1 className="text-2xl font-heading">Collections</h1>
      </Link>
      <LoginStatus></LoginStatus>
    </header>
  );
}
