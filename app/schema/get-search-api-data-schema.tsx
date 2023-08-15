import z from "zod";

const SearchSchema = z.object({
  results: z.array(
    z.object({
      format: z.array(z.literal("Vinyl")) | formats: z.array(z.literal("Vinyl")),
      year: z.optional(z.string()),
    })
  ),
});

export default SearchSchema;
