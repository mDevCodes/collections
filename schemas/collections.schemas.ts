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
  genre: z.string().optional(),
  formats: FormatsSchema,
});

export type Album = z.infer<typeof AlbumSchema>;
export type Formats = z.infer<typeof FormatsSchema>;

const SearchResponseSchema = z.object({
  data: z.array(AlbumSchema),
  currentPage: z.number(),
  isLastPage: z.boolean(),
});

const ListTypeSchema = z.enum(["collection", "wishlist"]);

const CollectionItemSchema = z.object({
  id: z.string(),
  discogsId: z.number(),
  listType: ListTypeSchema,
  albumTitle: z.string(),
  artist: z.string(),
  coverImage: z.string().nullable(),
  year: z.string().nullable(),
  genre: z.string().nullable(),
});

export type ListType = z.infer<typeof ListTypeSchema>;
export type CollectionItem = z.infer<typeof CollectionItemSchema>;

export { AlbumSchema, SearchResponseSchema, ListTypeSchema, CollectionItemSchema };
