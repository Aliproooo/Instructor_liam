import * as z from "zod";

const ImageFileSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File && file.type.startsWith("image/"), {
      message: "A image file must be selected",
    }),
});

export default ImageFileSchema;
