import z from "zod";

const DiscogsSearchResponseSchema = z.object({
  pagination: z.object({
    page: z.number(),
    pages: z.number(),
  }),
  results: z.array(
    z.object({
      id: z.number(),
      master_id: z.number().optional(),
      cover_image: z.string(),
      title: z.string(),
      year: z.string().optional(),
      genre: z.array(z.string()).optional(),
      format: z.array(z.string()),
      formats: z.array(
        z.object({
          name: z.string(),
          qty: z.string(),
          text: z.string().optional(),
          descriptions: z.string().array().optional(),
        })
      ),
      community: z
        .object({
          want: z.number(),
          have: z.number(),
        })
        .optional(),
    })
  ),
});

export { DiscogsSearchResponseSchema };
