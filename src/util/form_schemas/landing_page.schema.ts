import * as z from "zod";
const FormSchema = z.object({
  tagline: z.string().min(10, {
    message: "name must be at least 10 characters.",
  }),
  artist_name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  tagline_description: z.string().min(10, {
    message: "tagline description must be at least 10 characters.",
  }),
  description: z.string().min(10, {
    message: "description must be at least 10 characters.",
  }),
  facebook: z.string().min(10, {
    message: "facebook link must be at least 10 characters.",
  }),
  youtube: z.string().min(10, {
    message: "youtube link must be at least 10 characters.",
  }),
  instagram: z.string().min(10, {
    message: "instagram link must be at least 10 characters.",
  }),
});

export default FormSchema;
