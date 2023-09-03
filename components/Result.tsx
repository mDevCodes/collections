import { Album } from "@/app/utils/discogs.schemas";
import Image from "next/image";

export default function Result({ album }: { album: Album }) {
  return (
    <div className="flex">
      <Image
        src={album.cover_image}
        alt={`${album.title} cover image`}
        width={200}
        height={200}
      />
      <h2>Image {album.cover_image ? "Yes" : "No"}</h2>
      <div className="flex flex-column">
        <h3>Year: {album.year}</h3>
        <h3>Title: {album.title}</h3>
        <h3>Title: {album.title}</h3>
      </div>
    </div>
  );
}
