import z from "zod";

const AlbumSchema =  z.object({
  cover_image:z.string(),
  title: z.string().optional(),
  year: z.string().optional(),
  id: z.number().optional(),
})

export type Album = z.infer<typeof AlbumSchema>

const SearchResponseSchema = z.object({
  results: z.array(
   AlbumSchema
  ),
});

export {SearchResponseSchema};
