import { Album } from "@/app/utils/discogs.schemas";
import Image from "next/image";

export default function Result({ album }: { album: Album }) {
  return (
    <div className="flex mt-16">
      <Image
        src={album.cover_image}
        alt={`${album.title} cover image`}
        width={200}
        height={200}
      />
      <div className="ml-14">
        <h3 className="text-lg font-bold">Title: {album.title}</h3>
        <h3>Year: {album.year}</h3>
      </div>
    </div>
  );
}
