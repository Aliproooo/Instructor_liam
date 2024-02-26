import * as z from "zod";

const FaQFormSchema = z.object({
  question: z.string().min(10, { message: "minimum 10 char are required" }),
  ans: z.string().min(10, { message: "minimum 10 char are required" }),
});

export default FaQFormSchema;
