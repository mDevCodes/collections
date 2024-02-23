import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@next-auth/supabase-adapter"


interface SupabaseAdapterArgs {
  url: string;
  secret: string;
}

const adapterArgs: SupabaseAdapterArgs = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  secret: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
}

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "text", placeholder: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "54",
          name: "Makii",
          password: "password-test",
        };

        if (
          credentials?.username === user.name &&
          credentials.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: SupabaseAdapter({  url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  secret: process.env.SUPABASE_SERVICE_ROLE_KEY || '',}),
};
