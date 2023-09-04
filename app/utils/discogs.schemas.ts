import z from "zod";

const AlbumSchema =  z.object({
  id: z.number(),
  cover_image:z.string(),
  title: z.string(),
  year: z.string().optional(),
})

export type Album = z.infer<typeof AlbumSchema>

const SearchResponseSchema = z.object({
  results: z.array(
   AlbumSchema
  ),
});

export {SearchResponseSchema};
