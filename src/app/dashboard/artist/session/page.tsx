import EditDiscountDialog from "@/components/EditDiscoutDialog";
import SessionPriceDialog from "@/components/EditSessionDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import Link from "next/link";
type Props = {};

function Page({}: Props) {
  return (
    <div className="py-10 w-full ">
      <h1 className="text-4xl font-bold">Session Price Manager</h1>
      <p>Mange the session related details here.</p>
      <div className="grid gap-3 grid-cols-2 px-3 mt-10">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Total Booked Session</CardTitle>
            <CardDescription>
              Number of booked session in this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Total Booked Session</CardTitle>
            <CardDescription>
              Number of booked session in this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>
        {/* Edit Session Price */}
        <Link className=" col-span-2" href="/dashboard/artist/session/create">
          <Button className="w-full">Create Session</Button>
        </Link>
        <SessionPriceDialog />
        <EditDiscountDialog />
      </div>
    </div>
  );
}

export default Page;
