import { Album } from "@/app/utils/discogs.schemas";

export default function Result({ album }: { album: Album }) {
  return (
    <>
      <h3>Year: {album.year}</h3>
    </>
  );
}
