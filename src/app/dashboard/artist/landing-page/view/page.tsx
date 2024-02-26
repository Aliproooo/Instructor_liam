import React from "react";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
async function ViewArtistData() {
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
  return (
    <div>
      <h1 className="text-3xl font-bold">Existing Details</h1>
      <p>
        The details that you have already posted is visible on the landing page
      </p>
      <div className="text-2xl">
        <h2>
          <span className="font-bold">Tagline :</span>{" "}
          {landingPageData?.tagline}
        </h2>
        <h2>
          <span className="font-bold">Tagline Description :</span>{" "}
          {landingPageData?.tagline_description}
        </h2>
        <h2>
          <span className="font-bold">Artist Name :</span>{" "}
          {landingPageData?.name}
        </h2>
        <h2>
          <span className="font-bold">Artist Description :</span>{" "}
          {landingPageData?.description}
        </h2>
        <h2>
          <span className="font-bold">Facebook :</span>{" "}
          {
            //@ts-ignore
            groupedSocial?.Facebook[0].url
          }
        </h2>
        <h2>
          <span className="font-bold">Youtube :</span>{" "}
          {
            //@ts-ignore
            groupedSocial?.Youtube[0].url
          }
        </h2>
        <h2>
          <span className="font-bold">Instagram :</span>{" "}
          {
            //@ts-ignore
            groupedSocial?.Instagram[0].url
          }
        </h2>
      </div>
    </div>
  );
}

export default ViewArtistData;
