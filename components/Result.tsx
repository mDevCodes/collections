import Image from "next/image";
import Icon from "./Icon";
import { Album } from "@/app/utils/discogs.schemas";

export default function Result({ album }: { album: Album }) {
  return (
    <div className="flex p-24 border-bottom-solid border-b-2 border-stone-900">
      {album.cover_image.endsWith(".gif") ? (
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
          src={album.cover_image}
          alt={`${album.albumTitle} cover image`}
          width={200}
          height={200}
        />
      )}
      <div className="ml-14">
        <p className="text-xl font-bold">{album.albumTitle}</p>
        <p className="text-lg">{album.artist}</p>
        <p className="text-lg">{album.year ? album.year : "-"}</p>
      </div>
    </div>
  );
}
