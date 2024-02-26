import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";

type Props = {
  data: any;
};
import prisma from "@/lib/prisma";
import Reschedule from "./Reschedule";
async function getSessionDetails() {
  const session_details = await prisma.sessionDetails.findMany({
    orderBy: { createdAt: "desc" },
  });
  return session_details;
}

async function UpcomingSession({ data }: Props) {
  const session_detail = await getSessionDetails();
  console.log(session_detail);
  return (
    <div className="flex items-center justify-center mt-10">
      <Table>
        <TableCaption>Upcoming Sessions</TableCaption>
        <TableHeader>
          <TableRow className="w-full">
            <TableHead>NO</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Zoom Link</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((order: any, index: any) => (
            <React.Fragment key={order.id}>
              {JSON.parse(order.session_detail).map(
                //@ts-ignore

                (session: SessionDetail, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.customer_email}</TableCell>
                    <TableCell>{order.zoom_link.split("---")[idx]}</TableCell>
                    <TableCell>{session.startTime}</TableCell>
                    <TableCell>{session.endTime}</TableCell>
                    <TableCell>
                      {new Date(session.day?.trim())
                        .toUTCString()
                        .split(" ")
                        .slice(0, 4)
                        .join(" ")}
                    </TableCell>
                    <TableCell>
                      {new Date(session.day?.trim()) >=
                        new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) &&
                        session_detail && (
                          <React.Fragment>
                            <Reschedule
                              day={new Date(session.day?.trim())
                                .toUTCString()
                                .split(" ")
                                .slice(0, 4)
                                .join(" ")
                                .split(", ")
                                .join(" ")}
                              start={session.startTime}
                              end={session.endTime}
                              order={order}
                              session={{
                                startTime: session.startTime,
                                endTime: session.endTime,
                                session_day: session.day,
                              }}
                              id={order.landingPageId}
                              data={session_detail}
                              dayRaw={session.day}
                            />
                          </React.Fragment>
                        )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UpcomingSession;
