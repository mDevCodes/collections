import Image from "next/image";
import Icon from "./Icon";
import { Album } from "@/schemas/collections.schemas";
import concatAlbumDescription from "@/utils/getFormatsDescription";

export default function Result({ album }: { album: Album }) {
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

      <div>
        <div className="text-sm max-w-[250px] md:max-w-full">
          <p className="lg:text-xl font-bold">{album.albumTitle}</p>
          <p>{album.artist}</p>
          <p className="text-gray-400">{album.year ? album.year : "-"}</p>
        </div>
        <p className="text-xs mt-1">{concatAlbumDescription(album.formats)}</p>
      </div>
    </div>
  );
}
