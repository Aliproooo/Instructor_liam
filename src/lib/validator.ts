import * as z from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
export const registerFormSchema = z.object({
  leaderName: z.string().min(3, "Name must be atleast 3 characters"),
  leaderEmail: z.string().email(),
  noOfParticipants: z.string(),
  phoneNo: z
    .string()
    .min(11, "Phone number must be atleast 11 characters")
    .max(11, "Phone number cannot be more than 11 characters"),
  // imageUrl: z.string(),
  cnic: z
    .string()
    .min(13, "Cnic must be atleast 13 characters")
    .max(13, "Cnic cannot be more than 13 characters"),
  memberDetails: z.array(
    z.object({
      name: z.string().min(3, "Name must be atleast 3 characters"),
      email: z.string().email(),
      cnic: z
        .string()
        .min(13, "Cnic must be atleast 13 characters")
        .max(13, "Cnic cannot be more than 13 characters"),
    })
  ),
});
