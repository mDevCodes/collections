import z from "zod";

const AlbumSchema = z.object({
  id: z.number(),
  coverImage: z.string(),
  albumTitle: z.string().nonempty(),
  artist: z.string(),
  year: z.string().optional(),
});

export type Album = z.infer<typeof AlbumSchema>;

export { AlbumSchema };
