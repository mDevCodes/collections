"use client";
import Image from "next/image";
import Link from "next/link";
import { Lobster } from "next/font/google";
import { useSession } from "next-auth/react";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });
import Icon from "./Icon";
import { SessionProvider } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();
  return (
    <SessionProvider>
      <header
        className={`flex justify-between items-center border-b border-gray-800 p-4 ${lobster.className}`}
      >
        <Link href="/">
          <h1 className="text-2xl">Collections</h1>
        </Link>

        {status === "authenticated" ? (
          <Link href="/user-profile">
            <Image
              src="/images/profile-picture.jpg"
              width={32}
              height={32}
              alt="User profile picture"
              className="rounded-full"
            />
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <button>Sign In</button>
          </Link>
        )}
      </header>
    </SessionProvider>
  );
}
