"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <form
      className="mx-auto mt-10 flex w-full max-w-md flex-col gap-4 px-[18px]"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-2 font-display text-[28px] font-extrabold tracking-[-0.02em] text-text">
        Create an account
      </h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-display text-[14px] font-semibold text-text">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email"
          className="rounded-[10px] border border-field-border bg-field px-4 py-[13px] font-body text-[15px] text-text outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-display text-[14px] font-semibold text-text">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          minLength={6}
          placeholder="Password"
          className="rounded-[10px] border border-field-border bg-field px-4 py-[13px] font-body text-[15px] text-text outline-none"
        />
      </div>

      {error ? <p className="text-sm text-accent">{error}</p> : null}
      {message ? <p className="text-sm text-accent">{message}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-accent px-6 py-[11px] font-display text-[14px] font-semibold text-accent-text disabled:opacity-50"
      >
        {isSubmitting ? "Creating account..." : "Register"}
      </button>

      <p className="text-[14px] text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-accent underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
