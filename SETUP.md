## Wiring up Supabase (one-time)

This adds real accounts, a "My Collection" and "My Wishlist" you can save
albums to, and a public share link (`/u/<slug>`) for each user. All the code
is in place — the only thing left is standing up the Supabase project itself.

### 1. Create a Supabase project

1. Go to https://supabase.com, sign in (or sign up), and create a new project.
2. Wait for it to finish provisioning (a couple minutes).

### 2. Run the database migration

1. In the Supabase dashboard, open **SQL Editor > New query**.
2. Paste in the contents of `supabase/migrations/0001_init.sql` from this repo
   and run it. This creates the `profiles` and `collection_items` tables,
   their security policies, and a trigger that auto-creates a profile (with a
   random shareable slug) whenever someone registers.

### 3. Get your API keys

In the Supabase dashboard: **Project Settings > API**. You need:
- **Project URL**
- **anon / public key**

(Do not use the `service_role` key anywhere in this app — it's not needed and
should never be exposed to the client.)

### 4. Set environment variables

**Locally:** copy `.env.local.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=<Project URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
```
(`DISCOGS_API_KEY` should already be set from before — carry it over too.)

**On Vercel:** Project > Settings > Environment Variables, add the same two
`NEXT_PUBLIC_SUPABASE_*` variables for Production (and Preview, if you want
preview deploys to work), then redeploy.

### 5. (Optional) Configure email confirmation

By default Supabase requires email confirmation before a new account can sign
in. For quick testing you can turn this off in **Authentication > Providers >
Email > Confirm email** (toggle off). Leave it on for a real public launch.

### That's it

Once the env vars are set and the migration has run, registration, sign-in,
saving albums to a collection/wishlist, and the `/u/<slug>` share page all
work end-to-end — no further code changes needed.
