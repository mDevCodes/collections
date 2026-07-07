import Link from "next/link";
import clsx from "clsx";
import Icon from "./Icon";
import Cover from "./Cover";
import { Album } from "@/schemas/collections.schemas";

function ActionButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: "check" | "plus" | "heart" | "heart-filled";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex flex-1 items-center justify-center gap-[7px] whitespace-nowrap rounded-full px-[15px] py-[9px] font-display text-[13px] font-semibold dt:min-w-[152px] dt:flex-none",
        active
          ? "border border-accent bg-accent text-accent-text"
          : "border border-pill-border bg-transparent text-text"
      )}
    >
      <Icon type={icon} size="xsmall" />
      {label}
    </button>
  );
}

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
    <div className="flex flex-wrap items-start gap-[14px] border-b border-divider py-4 dt:flex-nowrap dt:items-center dt:gap-[22px] dt:py-5">
      <Cover
        src={album.coverImage}
        alt={`${album.albumTitle} cover image`}
        className="relative shrink-0 overflow-hidden rounded-[6px] shadow-cover"
        style={{ width: "clamp(72px,20vw,96px)", height: "clamp(72px,20vw,96px)" }}
      />

      <div className="min-w-[120px] flex-grow">
        <p className="mb-[3px] font-display text-[17px] font-semibold tracking-[-0.01em] text-text">
          {album.albumTitle}
        </p>
        <p className="mb-[3px] text-[15px] text-text">{album.artist}</p>
        <p className="text-[13px] text-muted">
          {album.year ? album.year : "—"}
          {album.genre ? ` · ${album.genre}` : ""}
        </p>
      </div>

      {isSignedIn ? (
        <div className="flex w-full flex-none basis-full gap-[9px] dt:w-auto dt:basis-auto dt:flex-col">
          <ActionButton
            active={isInCollection}
            icon={isInCollection ? "check" : "plus"}
            label={isInCollection ? "In Collection" : "Add to Collection"}
            onClick={onToggleCollection}
          />
          <ActionButton
            active={isInWishlist}
            icon={isInWishlist ? "heart-filled" : "heart"}
            label={isInWishlist ? "In Wishlist" : "Add to Wishlist"}
            onClick={onToggleWishlist}
          />
        </div>
      ) : (
        <p className="whitespace-nowrap text-[13px] font-medium text-muted">
          <Link href="/register" className="text-accent underline">
            Register
          </Link>{" "}
          or{" "}
          <Link href="/login" className="underline">
            log in
          </Link>{" "}
          to save
        </p>
      )}
    </div>
  );
}
