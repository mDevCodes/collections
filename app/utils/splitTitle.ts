export default function splitTitle(title: string) {
  const titleSplit = title.split("-");
  const artist = titleSplit[0].trimEnd();
  const album = titleSplit[1].trimStart();
  return {artist, album}
}
