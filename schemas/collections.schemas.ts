import z from "zod";

const FormatsSchema = z.array(
  z.object({
    name: z.string(),
    qty: z.string(),
    text: z.string().optional(),
    descriptions: z.string().array().optional(),
  })
);

const AlbumSchema = z.object({
  id: z.number(),
  coverImage: z.string(),
  albumTitle: z.string().nonempty(),
  artist: z.string(),
  year: z.string().optional(),
  formats: FormatsSchema,
});

export type Album = z.infer<typeof AlbumSchema>;
export type Formats = z.infer<typeof FormatsSchema>;

const SearchResponseSchema = z.object({
  pagination: z.object({
    page: z.number(),
    pages: z.number(),
  }),
  results: z.array(AlbumSchema),
});

export { AlbumSchema, SearchResponseSchema };
