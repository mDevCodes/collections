"use client";

import { useEffect, useState } from "react";
import { createClient } from "./client";
import useUser from "./useUser";

export type Profile = { username: string; shareSlug: string };

export default function useProfile() {
  const { user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    supabase
      .from("profiles")
      .select("username, share_slug")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setProfile(
          data ? { username: data.username, shareSlug: data.share_slug } : null
        );
        setIsLoading(false);
      });
  }, [user]);

  return { profile, isLoading };
}
