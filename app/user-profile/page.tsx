"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import useUser from "@/lib/supabase/useUser";
import useProfile from "@/lib/supabase/useProfile";
import { createClient } from "@/lib/supabase/client";
import { useCollectionItems } from "@/lib/hooks/useCollectionItems";
import { useTheme } from "@/lib/theme/ThemeProvider";
import Avatar from "@/components/Avatar";

function SegmentButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex-1 rounded-[8px] py-[9px] text-center font-display text-[13px] font-semibold",
        active
          ? "bg-toggle-active text-text shadow-toggle-active"
          : "bg-transparent text-muted"
      )}
    >
      {children}
    </button>
  );
}

export default function UserProfile() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const { profile, isLoading: isProfileLoading } = useProfile();
  const { theme, setTheme } = useTheme();
  const { data: collection } = useCollectionItems("collection");
  const { data: wishlist } = useCollectionItems("wishlist");
  const [displayName, setDisplayName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [isUserLoading, user, router]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName ?? profile.username);
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName })
      .eq("id", user!.id);

    setIsSaving(false);
    setSaved(!error);
  };

  const genreCount = new Set(
    (collection ?? []).map((item) => item.genre).filter(Boolean)
  ).size;

  const shareUrl =
    typeof window !== "undefined" && profile?.shareSlug
      ? `${window.location.origin}/u/${profile.shareSlug}`
      : "";

  const stats = [
    { value: collection?.length ?? 0, label: "Records" },
    { value: wishlist?.length ?? 0, label: "Wishlist" },
    { value: genreCount, label: "Genres" },
  ];

  if (isUserLoading || isProfileLoading || !user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-[560px] px-[18px] pb-24 pt-6 dt:px-8 dt:pb-20 dt:pt-10">
      <div className="mb-7 flex items-center gap-[18px]">
        {profile?.avatarVariant !== null && profile?.avatarVariant !== undefined ? (
          <Avatar variant={profile.avatarVariant} size={66} />
        ) : (
          <div className="h-[66px] w-[66px] shrink-0 rounded-full bg-gradient-to-br from-accent to-[#d98a4a]" />
        )}
        <div className="min-w-0">
          <h1 className="mb-[3px] font-display text-[clamp(26px,6vw,34px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-text">
            {profile?.displayName ?? profile?.username ?? "…"}
          </h1>
          <p className="truncate text-[14px] text-muted">{shareUrl}</p>
        </div>
      </div>

      <div className="mb-[34px] flex gap-[34px] border-y border-divider py-5">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="mb-[3px] font-display text-[24px] font-extrabold leading-none tracking-[-0.02em] text-text">
              {stat.value}
            </p>
            <p className="text-[13px] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="displayName"
          className="mb-2 block font-display text-[14px] font-semibold text-text"
        >
          Display name
        </label>
        <input
          id="displayName"
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
            setSaved(false);
          }}
          className="mb-[14px] w-full rounded-[10px] border border-field-border bg-field px-4 py-[13px] font-body text-[15px] text-text outline-none"
        />
        <div className="flex items-center gap-[14px]">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-accent px-6 py-[11px] font-display text-[14px] font-semibold text-accent-text disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
          {saved ? <span className="text-[14px] text-accent">Saved!</span> : null}
        </div>
      </form>

      <div className="mt-9 rounded-[14px] border border-border bg-surface p-[22px]">
        <p className="mb-[6px] font-display text-[16px] font-semibold text-text">
          Share your collection &amp; wishlist
        </p>
        <p className="mb-4 text-[14px] leading-[1.5] text-muted">
          Anyone with this link can view your records — no account needed. Great
          for friends, family, and fellow diggers.
        </p>
        <div className="flex flex-wrap items-center gap-[10px]">
          <div className="min-w-[180px] flex-grow truncate rounded-[10px] border border-field-border bg-field px-[15px] py-[11px] text-[14px] text-muted-2">
            {shareUrl}
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="shrink-0 rounded-[10px] border border-pill-border px-[18px] py-[11px] font-display text-[14px] font-semibold text-text"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <a
          href={`/u/${profile?.shareSlug}`}
          className="mt-[14px] block font-display text-[14px] font-semibold text-accent"
        >
          Preview public page →
        </a>
      </div>

      <p className="mb-[10px] mt-9 font-display text-[16px] font-semibold text-text">
        Appearance
      </p>
      <div className="flex max-w-[280px] gap-[6px] rounded-[11px] border border-border bg-toggle-bg p-[5px]">
        <SegmentButton active={theme === "light"} onClick={() => setTheme("light")}>
          Light
        </SegmentButton>
        <SegmentButton active={theme === "dark"} onClick={() => setTheme("dark")}>
          Dark
        </SegmentButton>
      </div>

      <div className="mt-9">
        <button
          onClick={() => {
            createClient()
              .auth.signOut()
              .then(() => router.push("/"));
          }}
          className="rounded-full border border-pill-border px-5 py-[10px] font-display text-[14px] font-semibold text-text"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
