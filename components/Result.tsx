import Image from "next/image";
import Icon from "./Icon";
import { Album } from "@/schemas/collections.schemas";

export default function Result({ album }: { album: Album }) {
  return (
    <div className="flex gap-6 px-8 py-24  border-bottom-solid border-b border-gray-800">
      {album.coverImage.endsWith(".gif") ? (
        <div className="w-[200px] h-[200px] p-12 rounded-sm bg-gray-800">
          <Icon
            className="w-full h-full text-white "
            type="no-img"
            size="medium"
          />
        </div>
      ) : (
        <Image
          className="rounded-sm"
          src={album.coverImage}
          alt={`${album.albumTitle} cover image`}
          width={200}
          height={200}
        />
      )}
      <div>
        <p className="text-xl font-bold">{album.albumTitle}</p>
        <p className="text-lg">{album.artist}</p>
        <p className="text-lg">{album.year ? album.year : "-"}</p>
      </div>
    </div>
  );
}
