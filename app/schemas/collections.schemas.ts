import z from "zod";

const SearchAlbumSchema = z.object({
  id: z.number(),
  coverImage: z.string(),
  albumTitle: z.string().nonempty(),
  artist: z.string(),
  year: z.string().optional(),
});

export type Album = z.infer<typeof SearchAlbumSchema>;

const SearchResponseSchema = z.object({
  results: z.array(SearchAlbumSchema),
});

export { SearchResponseSchema };
