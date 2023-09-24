import z from "zod";

const DiscogsAlbumSchema = z.object({
  id: z.number(),
  cover_image: z.string(),
  title: z.string(),
  year: z.string().optional(),
});

export type Album = z.infer<typeof DiscogsAlbumSchema>;

const DiscogsResponseSchema = z.object({
  results: z.array(DiscogsAlbumSchema),
});

export { DiscogsResponseSchema };
