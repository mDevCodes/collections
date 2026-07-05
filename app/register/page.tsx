"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import Avatar, { AVATAR_VARIANT_COUNT } from "@/components/Avatar";
import Icon from "@/components/Icon";

const GENRE_OPTIONS = [
  "Jazz",
  "Rock",
  "Soul",
  "Electronic",
  "Hip-Hop",
  "Alternative",
  "Psych",
  "Funk",
  "Folk",
  "Classical",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-body text-[12px] uppercase tracking-[0.12em] text-muted-2">
      {children}
    </p>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-display text-[14px] font-semibold text-text">
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-[10px] border border-field-border bg-field px-4 py-[13px] font-body text-[15px] text-text outline-none";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatarVariant, setAvatarVariant] = useState(0);
  const [genres, setGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    if (!isSupabaseConfigured()) {
      setIsSubmitting(false);
      setError(
        "Accounts aren't set up yet — Supabase hasn't been configured for this deployment. See SETUP.md."
      );
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.trim() || undefined,
            display_name: displayName.trim() || undefined,
            avatar_variant: avatarVariant,
            genres,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session) {
        router.push("/");
        router.refresh();
        return;
      }

      setMessage("Check your email to confirm your account, then sign in.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-[560px] px-[18px] py-[clamp(32px,5vw,52px)] pb-24 dt:px-6">
      <p className="mb-[14px] font-body text-[12px] uppercase tracking-[0.16em] text-accent">
        Welcome to Collections
      </p>
      <h1 className="mb-2 font-display text-[clamp(30px,5vw,40px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-text">
        Create your account
      </h1>
      <p className="mb-[38px] text-[16px] text-muted">
        Set up your profile — it only takes a minute.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Account */}
        <SectionLabel>Account</SectionLabel>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="you@example.com"
          className={clsx(inputClass, "mb-[18px]")}
        />
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <input
          type="password"
          name="password"
          id="password"
          required
          minLength={6}
          placeholder="At least 8 characters"
          className={clsx(inputClass, "mb-[34px]")}
        />

        {/* Identity */}
        <SectionLabel>Your identity</SectionLabel>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <div className="relative mb-[18px]">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-muted">
            @
          </span>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="cratedigger"
            className={clsx(inputClass, "pl-8")}
          />
        </div>
        <FieldLabel htmlFor="displayName">Display name</FieldLabel>
        <input
          type="text"
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="How your name appears to others"
          className={clsx(inputClass, "mb-[34px]")}
        />

        {/* Avatar */}
        <SectionLabel>Profile picture</SectionLabel>
        <p className="mb-[18px] text-[14px] text-muted">
          Pick a friendly avatar. Photo uploads are coming soon.
        </p>
        <div className="mb-[34px] flex flex-wrap gap-[14px]">
          <button
            type="button"
            disabled
            title="Photo uploads are coming soon"
            className="flex h-16 w-16 cursor-not-allowed flex-col items-center justify-center gap-[3px] rounded-2xl border-2 border-border bg-surface opacity-60"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#d98a4a]">
              <Icon type="no-img" size="small" className="text-white" />
            </div>
            <span className="font-display text-[11px] font-semibold text-muted">Upload</span>
          </button>
          {Array.from({ length: AVATAR_VARIANT_COUNT }, (_, i) => i).map((variant) => (
            <button
              type="button"
              key={variant}
              onClick={() => setAvatarVariant(variant)}
              aria-label={`Avatar style ${variant + 1}`}
              className={clsx(
                "flex h-16 w-16 items-center justify-center rounded-2xl border-2 bg-surface",
                avatarVariant === variant ? "border-accent" : "border-border"
              )}
            >
              <Avatar variant={variant} size={52} />
            </button>
          ))}
        </div>

        {/* Taste */}
        <SectionLabel>Your taste</SectionLabel>
        <p className="mb-[18px] text-[14px] text-muted">
          Pick a few genres — we&apos;ll tailor your recommendations.
        </p>
        <div className="mb-10 flex flex-wrap gap-[9px]">
          {GENRE_OPTIONS.map((genre) => {
            const active = genres.includes(genre);
            return (
              <button
                type="button"
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={clsx(
                  "rounded-full px-4 py-[9px] font-display text-[14px]",
                  active
                    ? "border border-accent bg-accent font-semibold text-accent-text"
                    : "border border-pill-border bg-transparent font-medium text-text"
                )}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {error ? <p className="mb-4 text-[14px] text-accent">{error}</p> : null}
        {message ? <p className="mb-4 text-[14px] text-accent">{message}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mb-4 w-full rounded-full bg-accent px-6 py-[15px] font-display text-[16px] font-bold text-accent-text disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
        <p className="text-center text-[13px] leading-[1.5] text-muted">
          By creating an account you agree to our Terms &amp; Privacy Policy.
        </p>
      </form>
    </main>
  );
}
