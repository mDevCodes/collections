import z from "zod";

const DiscogsSearchResponseSchema = z.object({
  pagination: z.object({
    page: z.number(),
    pages: z.number(),
  }),
  results: z.array(
    z.object({
      id: z.number(),
      cover_image: z.string(),
      title: z.string(),
      year: z.string().optional(),
      genre: z.array(z.string()).optional(),
      format: z.array(z.string()),
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
