"use client";

import Link from "next/link";
import useUser from "@/lib/supabase/useUser";
import { createClient } from "@/lib/supabase/client";

export default function LoginStatus() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  if (user) {
    return (
      <div className="flex flex-row gap-4 items-center">
        <Link href="/collection" className="hidden sm:inline">
          Collection
        </Link>
        <Link href="/wishlist" className="hidden sm:inline">
          Wishlist
        </Link>
        <Link href="/user-profile">Profile</Link>
        <button
          onClick={() => createClient().auth.signOut()}
          className="border-2 border-gray-800 rounded-xl px-3 py-1"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3 items-center">
      <Link href="/login">Sign In</Link>
      <Link
        href="/register"
        className="border-2 border-gray-800 rounded-xl px-3 py-1"
      >
        Register
      </Link>
    </div>
  );
}
