export default function Result({
  album,
}: {
  album: { year?: string | undefined; id?: number | undefined };
}) {
  return (
    <>
      <h3>Year: {album.year}</h3>
    </>
  );
}
