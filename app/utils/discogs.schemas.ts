import z from "zod";

const DiscogsAlbumSchema = z.object({
  id: z.number(),
  cover_image: z.string(),
  title: z.string(),
  year: z.string().optional(),
});

const SearchAlbumSchema = z.object({
  id: z.number(),
  cover_image: z.string(),
  albumTitle: z.string().nonempty(),
  artist: z.string(),
  year: z.string().optional(),
});

export type Album = z.infer<typeof SearchAlbumSchema>;
export type DiscogsAlbum = z.infer<typeof DiscogsAlbumSchema>;

const SearchResponseSchema = z.object({
  results: z.array(SearchAlbumSchema),
});

const DiscogsResponseSchema = z.object({
  results: z.array(DiscogsAlbumSchema),
});

export { DiscogsResponseSchema, SearchResponseSchema };
