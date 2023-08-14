import z from "zod";

const SingleResultSchema = z.object({
  year: z.string(),
  // title: z.string(),
  // thumb: z.string(),
  // style: z.array(z.string()),
});

const ResultsArraySchema = z.array(SingleResultSchema);

const SearchSchema = z.object({
  results: ResultsArraySchema,
});

export default SearchSchema;
