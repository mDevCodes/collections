import { Album } from "@/app/utils/discogs.schemas";
import Image from "next/image";
import Icon from "./Icon";

export default function Result({ album }: { album: Album }) {
  return album.title ? (
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
          alt={`${album.title} cover image`}
          width={200}
          height={200}
        />
      )}
      <div className="ml-14">
        <h3 className="text-lg font-bold">{album.title}</h3>
        <p className="text-lg">{album.year ? album.year : "-"}</p>
      </div>
    </div>
  ) : null;
}
