-- Collections app: profiles + collection/wishlist items
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query) after project creation.

create extension if not exists pgcrypto;

-- One row per auth user. share_slug is the public, shareable identifier
-- (e.g. /u/<share_slug>) so real usernames/emails never need to be exposed.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null,
  share_slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.collection_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  list_type text not null check (list_type in ('collection', 'wishlist')),
  discogs_id bigint not null,
  album_title text not null,
  artist text not null,
  cover_image text,
  year text,
  created_at timestamptz not null default now(),
  unique (user_id, list_type, discogs_id)
);

create index if not exists collection_items_user_list_idx
  on public.collection_items (user_id, list_type);

alter table public.profiles enable row level security;
alter table public.collection_items enable row level security;

-- Profiles and collection items are publicly readable so that shared
-- collection/wishlist links (/u/<share_slug>) work for signed-out visitors.
-- Only the owner can ever write their own rows.
create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Collection items are publicly readable"
  on public.collection_items for select
  using (true);

create policy "Users can insert their own collection items"
  on public.collection_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own collection items"
  on public.collection_items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own collection items"
  on public.collection_items for delete
  using (auth.uid() = user_id);

-- Auto-create a profile row (with a random share slug) whenever a new
-- auth user signs up, so the app never has to handle a missing profile.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, share_slug)
  values (
    new.id,
    coalesce(split_part(new.email, '@', 1), 'collector'),
    encode(gen_random_bytes(6), 'hex')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
