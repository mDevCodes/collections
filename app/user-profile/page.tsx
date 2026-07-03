"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useUser from "@/lib/supabase/useUser";
import { createClient } from "@/lib/supabase/client";

export default function UserProfile() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const [username, setUsername] = useState("");
  const [shareSlug, setShareSlug] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [isUserLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("profiles")
      .select("username, share_slug")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setUsername(data.username);
          setShareSlug(data.share_slug);
        }
      });
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", user!.id);

    setIsSaving(false);
    setMessage(error ? error.message : "Saved!");
  };

  const shareUrl =
    typeof window !== "undefined" && shareSlug
      ? `${window.location.origin}/u/${shareSlug}`
      : "";

  if (isUserLoading || !user) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <h1 className="text-3xl font-heading mt-10 mb-6">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="username">Display name</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-md mt-1 text-black p-1 pl-2.5"
          />
        </div>

        {message ? <p className="text-sm text-green-400">{message}</p> : null}

        <button
          type="submit"
          disabled={isSaving}
          className="border-2 border-gray-800 rounded-xl p-2 disabled:opacity-50 w-fit"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </form>

      <div className="mt-8">
        <p className="font-bold mb-1">Share your collection & wishlist</p>
        <p className="text-sm text-gray-400 mb-2">
          Anyone with this link can view your collection and wishlist — no
          account needed. Great for sending to friends and family.
        </p>
        <div className="flex gap-2 items-center">
          <Link href={`/u/${shareSlug}`} className="underline break-all text-sm">
            {shareUrl}
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="text-xs border-2 border-gray-800 rounded-xl px-2 py-1 shrink-0"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <button
        onClick={() => {
          createClient()
            .auth.signOut()
            .then(() => router.push("/"));
        }}
        className="mt-10 border-2 border-gray-800 rounded-xl px-3 py-1"
      >
        Sign Out
      </button>
    </div>
  );
}
