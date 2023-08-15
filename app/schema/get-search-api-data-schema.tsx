import z from "zod";

const SearchSchema = z.object({
  results: z.array(
    z.object({
      year: z.string(),
    })
  ),
});

export default SearchSchema;
