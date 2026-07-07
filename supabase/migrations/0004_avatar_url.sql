-- Adds support for uploaded profile photos. Registration can now optionally
-- upload an image to Supabase Storage instead of only picking one of the
-- illustrated avatar variants (components/Avatar.tsx). Run this once in the
-- Supabase SQL editor (Project > SQL Editor > New query), same as
-- 0001_init.sql. The storage bucket + policies below can also be created via
-- the Storage UI instead -- these statements are just the SQL equivalent.

alter table public.profiles add column if not exists avatar_url text;

-- Registration writes the uploaded photo's public URL here directly (see
-- app/register/page.tsx) once the account exists, since a binary file can't
-- ride along in auth signUp metadata the way username/genres/etc. do. This
-- column just lets it seed from metadata too, for consistency with the rest.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public, extensions
as $$
begin
  insert into public.profiles (id, username, share_slug, display_name, avatar_variant, avatar_url, genres)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1), 'collector'),
    encode(gen_random_bytes(6), 'hex'),
    new.raw_user_meta_data ->> 'display_name',
    (new.raw_user_meta_data ->> 'avatar_variant')::int,
    new.raw_user_meta_data ->> 'avatar_url',
    case
      when new.raw_user_meta_data -> 'genres' is null then null
      else array(select jsonb_array_elements_text(new.raw_user_meta_data -> 'genres'))
    end
  );
  return new;
end;
$$;

-- Public "avatars" bucket: readable by anyone (avatars show up in the nav and
-- on shared profiles), writable only by an authenticated user into their own
-- `${auth.uid()}/...` folder.
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Avatar images are publicly accessible"
on storage.objects for select
using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
on storage.objects for insert
to authenticated
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update their own avatar"
on storage.objects for update
to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete their own avatar"
on storage.objects for delete
to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
