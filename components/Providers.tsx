"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import useSession from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const { session } = useSession(options);
  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
