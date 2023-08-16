import z from "zod";

const SearchSchema = z.object({
  results: z.array(
    z.object({
      year: z.optional(z.string()),
    })
  ),
});

export default SearchSchema;
