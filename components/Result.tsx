import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { Album } from "@/schemas/collections.schemas";
import concatAlbumDescription from "@/utils/getFormatsDescription";

export default function Result({
  album,
  isSignedIn,
  isInCollection,
  isInWishlist,
  onToggleCollection,
  onToggleWishlist,
}: {
  album: Album;
  isSignedIn: boolean;
  isInCollection: boolean;
  isInWishlist: boolean;
  onToggleCollection: () => void;
  onToggleWishlist: () => void;
}) {
  return (
    <div className="flex w-full gap-6 mb-5 pb-5 border-b border-solid border-gray-800">
      <div className="relative w-24 h-24 lg:w-36 lg:h-36 shrink-0 overflow-hidden">
        {album.coverImage.endsWith(".gif") ? (
          <Icon
            className="w-full h-full text-white bg-gray-800 p-7 lg:p-10"
            type="no-img"
            size="medium"
          />
        ) : (
          <Image
            className="rounded-sm object-cover w-full"
            src={album.coverImage}
            alt={`${album.albumTitle} cover image`}
            fill
          />
        )}
      </div>

      <div className="flex grow justify-between gap-3">
        <div>
          <div className="text-sm max-w-[250px] md:max-w-full">
            <p className="lg:text-xl font-bold">{album.albumTitle}</p>
            <p>{album.artist}</p>
            <p className="text-gray-400">{album.year ? album.year : "-"}</p>
          </div>
          <p className="text-xs mt-1">
            {concatAlbumDescription(album.formats)}
            {album.pressingCount && album.pressingCount > 1 ? (
              <span className="text-gray-400">
                {" "}
                &middot; {album.pressingCount} pressings
              </span>
            ) : null}
          </p>
          <a
            href={`https://www.discogs.com/sell/release/${album.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline text-gray-400"
          >
            Buy on Discogs
          </a>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          {isSignedIn ? (
            <>
              <button
                onClick={onToggleCollection}
                title={
                  isInCollection ? "Remove from collection" : "Add to collection"
                }
                className="flex items-center gap-1 text-xs border-2 border-gray-800 rounded-xl px-2 py-1"
              >
                <Icon type={isInCollection ? "check" : "plus"} size="xsmall" />
                <span className="hidden sm:inline">
                  {isInCollection ? "In collection" : "Collection"}
                </span>
              </button>
              <button
                onClick={onToggleWishlist}
                title={
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
                className="flex items-center gap-1 text-xs border-2 border-gray-800 rounded-xl px-2 py-1"
              >
                <Icon
                  type={isInWishlist ? "heart-filled" : "heart"}
                  size="xsmall"
                />
                <span className="hidden sm:inline">
                  {isInWishlist ? "In wishlist" : "Wishlist"}
                </span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-xs underline text-gray-400 whitespace-nowrap"
            >
              Sign in to save
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
