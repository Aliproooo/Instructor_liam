import DisplayOrders from "@/components/DisplayOrders";
import React from "react";
import prisma from "@/lib/prisma";
async function Page() {
  const orders = await prisma.orders.findMany();
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
