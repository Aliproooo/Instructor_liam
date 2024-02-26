"use server";
import FormSchema from "@/util/form_schemas/request_vendor.schema";
import * as z from "zod";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

type RequestVendorInput = z.infer<typeof FormSchema>;

export default async function requestVendor(
  input: RequestVendorInput
): Promise<{ success: boolean; error?: string } | any> {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();
    if (!isAuthenticated) {
      redirect("/api/auth/login");
    }
    const user = await getUser();
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const body = FormSchema.safeParse(input);
    if (!body.success) {
      return { success: false, error: body.error.format() };
    }

    const { data } = body;

    const artist = await prisma.requestingArtist.create({
      data: {
        name: data.name,
        phonenumber: data.phone,
        description: data.description,
        genre: data.genre,
        email: user.email!,
        stage_name: data.stage_name,
      },
    });

    console.log(artist);

    return { success: true, data: artist };
  } catch (err) {
    console.log(err);
    return { success: false, error: "something went wrong" };
  }
}
