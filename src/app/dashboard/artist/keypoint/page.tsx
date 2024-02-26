import AddKeyPointDialog from "@/components/AddKeyPointDialog";
import DisplayKeyPoint from "@/components/DisplayKeyPoint";
import React from "react";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

type Props = {};

async function getKeyPoints(externalId: string) {
  try {
    const landing_page = await prisma.landingPage.findFirst({
      where: {
        externalId,
      },
    });

    const keypoints = await prisma.keyPoints.findMany({
      where: {
        landingPageId: landing_page?.id,
      },
    });

    return keypoints;
  } catch (err) {
    console.log(err);
  }
}

async function page({}: Props) {
  async function Revalidate() {
    "use server";
    try {
      revalidatePath("/dashboard/artist/FaQ");
    } catch (e) {
      console.log(e);
    }
  }
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const keypoints = await getKeyPoints(user.id);
  console.log(keypoints);
  if (!keypoints) {
    redirect("/");
  }
  console.log(keypoints);
  return (
    <div className="w-full py-10">
      <div>
        <h1 className="text-3xl font-bold">Manage Key Points</h1>
        <p>
          Here you can add the key points/advantages of buying your session that
          will show on you&apos;r landing page{" "}
        </p>
      </div>
      <div className="flex items-end justify-end px-10">
        <AddKeyPointDialog revalidate={Revalidate} />
      </div>
      <div className="mt-10">
        <DisplayKeyPoint data={keypoints} />
      </div>
    </div>
  );
}

export default page;
