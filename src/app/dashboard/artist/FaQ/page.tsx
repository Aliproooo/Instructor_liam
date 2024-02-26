import AddFaqDialog from "@/components/AddFaqDialog";
import AddKeyPointDialog from "@/components/AddKeyPointDialog";
import DisplayFaQs from "@/components/DisplayFaQs";
import DisplayKeyPoint from "@/components/DisplayKeyPoint";
import React from "react";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
type Props = {};

async function getFaqs(externalId: string) {
  try {
    const landing_page = await prisma.landingPage.findFirst({
      where: {
        externalId,
      },
    });

    const faqs = await prisma.faq.findMany({
      where: {
        landingPageId: landing_page?.id,
      },
    });

    return faqs;
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
  const faqs = await getFaqs(user.id);
  console.log(faqs);
  if (!faqs) {
    redirect("/");
  }
  console.log(faqs);
  return (
    <div className="w-full py-10">
      <div>
        <h1 className="text-3xl font-bold">Manage FaQs</h1>
        <p>Here you can add the faqs that will appear on you landing page</p>
      </div>
      <div className="flex items-end justify-end px-10">
        <AddFaqDialog revalidate={Revalidate} />
      </div>
      <div className="mt-10">
        <DisplayFaQs data={faqs} />
      </div>
    </div>
  );
}

export default page;
