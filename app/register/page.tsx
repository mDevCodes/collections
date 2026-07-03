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
      className="flex flex-col mx-auto max-w-md mt-6 w-full px-4 gap-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-heading">Create an account</h1>

      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email"
          className="rounded-md mt-1 text-black p-1 pl-2.5"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          minLength={6}
          placeholder="Password"
          className="rounded-md mt-1 text-black p-1 pl-2.5"
        />
      </div>

      {error ? <p className="text-red-400 text-sm">{error}</p> : null}
      {message ? <p className="text-green-400 text-sm">{message}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="border-2 border-gray-800 rounded-xl p-2 disabled:opacity-50"
      >
        {isSubmitting ? "Creating account..." : "Register"}
      </button>

      <p className="text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
