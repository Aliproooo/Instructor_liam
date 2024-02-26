// dashboard/artist/landing-page/page.tsx

import LandingPageForm from "@/components/LandingPageForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
export default async function LandingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  console.log(user.id);
  const landingPageData = await prisma.landingPage.findUnique({
    where: { externalId: user.id },
    include: { socials: true },
  });

  const groupedSocial = landingPageData?.socials.reduce((grouped, item) => {
    const key = item.name;
    //@ts-ignore
    if (!grouped[key]) {
      //@ts-ignore
      grouped[key] = [];
    }
    //@ts-ignore
    grouped[key].push(item);
    return grouped;
  }, {});

  console.log(groupedSocial);

  console.log(landingPageData);
  return (
    <div className="w-full py-10">
      <h1 className="text-3xl font-bold">Landing Page Editor</h1>
      <p className="pb-10">
        Here is the editor where you can edit you can edit your landing page{" "}
      </p>
      <LandingPageForm
        formDefaultValues={landingPageData}
        socials={groupedSocial}
      />
    </div>
  );
}
