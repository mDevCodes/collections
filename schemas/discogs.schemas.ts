import z from "zod";

const DiscogsSearchResponseSchema = z.object({
  results: z.array(
    z.object({
      id: z.number(),
      cover_image: z.string(),
      title: z.string(),
      year: z.string().optional(),
    })
  ),
});

export { DiscogsSearchResponseSchema };
