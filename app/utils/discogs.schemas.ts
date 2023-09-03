import z from "zod";

const SearchResponseSchema = z.object({
  results: z.array(
    z.object({
      year: z.string().optional(),
      id: z.number().optional()
    })
  ),
});

export {SearchResponseSchema};
