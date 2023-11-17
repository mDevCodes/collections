"use client";
import Image from "next/image";
import Link from "next/link";
import { Lobster, Inter } from "next/font/google";
import { useSession } from "next-auth/react";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });
const inter = Inter({ weight: "400", subsets: ["latin"] });
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
          <div className="flex flex-row gap-3 items-center">
            <Link href="/user-profile">
              <Image
                src="/images/profile-picture.jpg"
                width={32}
                height={32}
                alt="User profile picture"
                className="rounded-full"
              />
            </Link>
            <Link href={"/api/auth/signout"}>
              <button className={`${inter.className} `}>Sign Out</button>
            </Link>
          </div>
        ) : (
          <Link href="/api/auth/signin">
            <button className={`${inter.className} `}>Sign In</button>
          </Link>
        )}
      </header>
    </SessionProvider>
  );
}
