import Image from "next/image";
import Icon from "./Icon";
import { Album } from "@/schemas/collections.schemas";

export default function Result({ album }: { album: Album }) {
  return (
    <div className="flex w-full items-center gap-6 py-4  border-bottom-solid border-gray-800">
      <div className="relative w-24 h-24 shrink-0 overflow-hidden">
        {album.coverImage.endsWith(".gif") ? (
          <Icon
            className="w-full h-full text-white bg-gray-800 p-7"
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

      <div>
        <p className="text-sm font-bold">{album.albumTitle}</p>
        <p className="text-sm">{album.artist}</p>
        <p className="text-sm text-gray-400">{album.year ? album.year : "-"}</p>
      </div>
    </div>
  );
}
