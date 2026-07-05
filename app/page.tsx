"use client";

import useUser from "@/lib/supabase/useUser";
import Landing from "@/components/landing/Landing";
import Explore from "@/components/app/Explore";

export default function Home() {
  const { user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) {
    return null;
  }

  if (!user) {
    return <Landing />;
  }

  return <Explore />;
}
