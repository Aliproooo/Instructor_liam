import * as z from "zod";
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "phone number must be at least 10 characters.",
  }),
  description: z.string().min(10, {
    message: "description must be at least 10 characters.",
  }),
  genre: z.string().min(2, {
    message: "genre must be selected.",
  }),
  stage_name: z.string().min(2, {
    message: "stage name must be at least 2 characters.",
  }),
});

export default FormSchema;
