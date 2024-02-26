import { z } from "zod";
export const SessionSchema = z.array(
  z.object({
    day: z.string(),
    slots: z.array(z.string()),
  })
);
