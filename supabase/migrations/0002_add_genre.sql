-- Adds genre to collection/wishlist items so the library screens can group,
-- filter, and display by genre. Run this once in the Supabase SQL editor
-- (Project > SQL Editor > New query), same as 0001_init.sql.

alter table public.collection_items add column if not exists genre text;
