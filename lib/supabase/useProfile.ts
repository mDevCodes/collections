"use client";

import { useEffect, useState } from "react";
import { createClient } from "./client";
import useUser from "./useUser";

export type Profile = {
  username: string;
  shareSlug: string;
  displayName: string | null;
  avatarVariant: number | null;
  avatarUrl: string | null;
  genres: string[] | null;
};

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
      .select("username, share_slug, display_name, avatar_variant, avatar_url, genres")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setProfile(
          data
            ? {
                username: data.username,
                shareSlug: data.share_slug,
                displayName: data.display_name,
                avatarVariant: data.avatar_variant,
                avatarUrl: data.avatar_url,
                genres: data.genres,
              }
            : null
        );
        setIsLoading(false);
      });
  }, [user]);

  return { profile, isLoading };
}
