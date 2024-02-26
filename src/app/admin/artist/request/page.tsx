import React from "react";
import ArtistRequestTable from "@/components/ArtistRequestTable";
import prisma from "@/lib/prisma";
type Props = {};

async function Page({}: Props) {
  const data = await prisma.requestingArtist.findMany();
  console.log(data);
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold pt-10">Artist Details</h1>
      <p className="pb-10">
        Artist that are requesting to be a part of this website
      </p>
      <ArtistRequestTable data={data} />
    </div>
  );
}

export default Page;
