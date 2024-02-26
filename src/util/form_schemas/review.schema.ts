import * as z from "zod";

const videoFileSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File && file.type.startsWith("video/"), {
      message: "A video file must be selected",
    }),
});

export default videoFileSchema;
