"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function NavBar() {
  const { status } = useSession();
  return (
    <header
      className={`flex justify-between items-center border-b border-gray-800 p-4`}
    >
      <Link href="/">
        <h1 className="text-2xl font-heading">Collections</h1>
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
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <Link href="/api/auth/signin">
          <button onClick={() => signIn()}>Sign In</button>
        </Link>
      )}
    </header>
  );
}
