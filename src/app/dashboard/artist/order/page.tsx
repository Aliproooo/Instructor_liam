import DisplayOrders from "@/components/DisplayOrders";
import React from "react";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getOrders(externalId: string) {
  try {
    const landing_page = await prisma.landingPage.findFirst({
      where: {
        externalId,
      },
    });

    const orders = await prisma.orders.findMany({
      where: {
        landingPageId: landing_page?.id,
      },
    });

    return orders;
  } catch (err) {
    console.log(err);
  }
}

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const orders = await getOrders(user.id);
  console.log(orders);
  if (!orders) {
    redirect("/");
  }
  console.log(orders);
  return (
    <div className="w-full py-10">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p>Here You can view all the order details</p>
      </div>

      <div className="mt-10">
        <DisplayOrders data={orders} />
      </div>
    </div>
  );
}

export default Page;
