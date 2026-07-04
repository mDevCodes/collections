"use client";

import Image from "next/image";
import Icon from "./Icon";
import useUser from "@/lib/supabase/useUser";
import {
  useCollectionItems,
  useToggleCollectionItem,
} from "@/lib/hooks/useCollectionItems";
import { ListType } from "@/schemas/collections.schemas";

export default function CollectionList({
  listType,
  title,
}: {
  listType: ListType;
  title: string;
}) {
  const { user, isLoading: isUserLoading } = useUser();
  const { data: items, isLoading } = useCollectionItems(listType);
  const { remove } = useToggleCollectionItem(listType);

  if (isUserLoading) {
    return null;
  }

  if (!user) {
    return (
      <p className="mt-10">
        <a href="/login" className="underline">
          Sign in
        </a>{" "}
        to see your {title.toLowerCase()}.
      </p>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-heading mt-10 mb-6">{title}</h1>

      {isLoading ? <p>Loading...</p> : null}

      {!isLoading && items?.length === 0 ? (
        <p className="text-gray-400">Nothing here yet — save an album from search to add it.</p>
      ) : null}

      {items?.map((item) => (
        <div
          key={item.id}
          className="flex w-full gap-6 mb-5 pb-5 border-b border-solid border-gray-800"
        >
          <div className="relative w-24 h-24 shrink-0 overflow-hidden">
            {item.coverImage ? (
              <Image
                className="rounded-sm object-cover w-full"
                src={item.coverImage}
                alt={`${item.albumTitle} cover image`}
                fill
              />
            ) : (
              <Icon
                className="w-full h-full text-white bg-gray-800 p-7"
                type="no-img"
                size="medium"
              />
            )}
          </div>

          <div className="flex grow justify-between gap-3 items-center">
            <div className="text-sm">
              <p className="font-bold">{item.albumTitle}</p>
              <p>{item.artist}</p>
              <p className="text-gray-400">{item.year ?? "-"}</p>
              <a
                href={`https://www.discogs.com/sell/release/${item.discogsId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline text-gray-400"
              >
                Buy on Discogs
              </a>
            </div>

            <button
              onClick={() => remove.mutate(item.discogsId)}
              className="text-xs border-2 border-gray-800 rounded-xl px-2 py-1 shrink-0"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
