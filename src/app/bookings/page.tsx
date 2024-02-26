import React from "react";
import UpcomingSession from "../../components/UpcomingSession";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getUpcomingSessions(email: string) {
  try {
    const session = await prisma.orders.findMany({
      where: { customer_email: email },
    });

    return session;
  } catch (err) {
    console.log(err);
  }
}

async function BookingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  const sessions = await getUpcomingSessions(user.email!);
  console.log(sessions);
  return (
    <div className="px-10 container  min-h-screen py-4">
      <h1 className="mt-10 text-3xl font-bold">Booking Page</h1>
      <p className="text-lg mt-4">Upcoming Sessions with our Artist</p>
      {sessions && sessions.length > 0 ? (
        <UpcomingSession data={sessions} />
      ) : (
        <>No Upcoming Sessions</>
      )}
    </div>
  );
}

export default BookingPage;
