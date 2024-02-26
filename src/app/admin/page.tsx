import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";

type Props = {};

async function getDetails(externalId: string) {
  try {
    const sales = await prisma.orders.findMany({});

    const totalSales = sales.reduce(
      (total, item) => total + item.bill_amount,
      0
    );
    return totalSales / 100;
  } catch (err) {
    console.log(err);
  }
}

function calculateNumberOfSlots(data: any) {
  let totalSlots = 0;
  for (let i = 0; i < data.length; i++) {
    totalSlots += data[i].slots.length;
  }
  console.log(totalSlots);
  return totalSlots;
}

async function getFreeSlot(externalId: string) {
  try {
    const sales = await prisma.sessionDetails.findMany();

    return calculateNumberOfSlots(sales[0].slots_details);
  } catch (err) {
    console.log(err);
  }
}

async function getTotalBooking(externalId: string) {
  try {
    const sales = await prisma.orders.findMany({});

    return sales.length;
  } catch (err) {
    console.log(err);
  }
}

async function AdminDashboard({}: Props) {
  const { isAuthenticated, getPermission, getUser } = getKindeServerSession();
  if (!isAuthenticated) {
    redirect("/api/auth/login");
  }
  const user = await getUser();

  const isAdmin = await getPermission("user:admin");
  if (!isAdmin?.isGranted) {
    redirect("/");
  }
  if (!user) {
    redirect("/");
  }

  const totalSales = await getDetails(user.id);
  const totalBooking = await getTotalBooking(user.id);
  const freeSlot = await getFreeSlot(user.id);

  return (
    <div className="py-10 w-full ">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      <p>See All the analytics from here</p>
      <div className="grid gap-3 grid-cols-2 px-3 mt-10">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Total Booked Session</CardTitle>
            <CardDescription>
              Number of booked session in this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalBooking}</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Total Free Slots</CardTitle>
            <CardDescription>
              Number of slots that are free in this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{freeSlot}</p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
            <CardDescription>The all time sales of your&apos;s</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">${totalSales}</p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>
              TThe Review&apos;s on your landing page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">4</p>
          </CardContent>
        </Card>
        {/* Edit Session Price */}
      </div>
    </div>
  );
}

export default AdminDashboard;
