-- Adds the fields collected during registration: a separate display name,
-- an illustrated avatar variant (0-5, see components/Avatar.tsx), and the
-- genres a user picked as their taste. Run this once in the Supabase SQL
-- editor (Project > SQL Editor > New query), same as 0001_init.sql.

alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists avatar_variant int;
alter table public.profiles add column if not exists genres text[];

-- Registration passes these along as auth user metadata (see
-- supabase.auth.signUp options.data in app/register/page.tsx) so the
-- trigger can seed them immediately, before email confirmation completes.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
-- pgcrypto (gen_random_bytes) lives in the `extensions` schema on Supabase,
-- not `public` -- it must be on the search_path or this fails with
-- "Database error saving new user" on every signup.
security definer set search_path = public, extensions
as $$
begin
  insert into public.profiles (id, username, share_slug, display_name, avatar_variant, genres)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1), 'collector'),
    encode(gen_random_bytes(6), 'hex'),
    new.raw_user_meta_data ->> 'display_name',
    (new.raw_user_meta_data ->> 'avatar_variant')::int,
    case
      when new.raw_user_meta_data -> 'genres' is null then null
      else array(select jsonb_array_elements_text(new.raw_user_meta_data -> 'genres'))
    end
  );
  return new;
end;
$$;
