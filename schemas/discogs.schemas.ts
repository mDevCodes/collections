import z from "zod";

const DiscogsSearchResponseSchema = z.object({
  page: z.number(),
  pages: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      cover_image: z.string(),
      title: z.string(),
      year: z.string().optional(),
      formats: z.array(
        z.object({
          name: z.string(),
          qty: z.string(),
          text: z.string().optional(),
          descriptions: z.string().array().optional(),
        })
      ),
    })
  ),
});

export { DiscogsSearchResponseSchema };
