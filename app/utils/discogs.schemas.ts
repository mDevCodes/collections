import z from "zod";

const AlbumSchemaMod =  z.object({
  id: z.number(),
  cover_image:z.string(),
  title: z.string(),
  year: z.string().optional(),
})

const AlbumSchema =  z.object({
  id: z.number(),
  cover_image:z.string(),
  title: z.string(),
  year: z.string().optional(),
})


export type Album = z.infer<typeof AlbumSchema>
export type AlbumMod = z.infer<typeof AlbumSchema>


const SearchResponseSchema = z.object({
  results: z.array(
   AlbumSchema
  ),
});

export {SearchResponseSchema};
