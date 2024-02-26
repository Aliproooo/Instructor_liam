"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { BinaryIcon, Trash, Trash2, Trash2Icon } from "lucide-react";

type SessionDetail = {
  startTime: string;
  endTime: string;
  available: boolean;
};

type Order = {
  id: number;
  customer_email: string;
  bill_amount: number;
  zoom_link: string;
  artist_name: string;
  session_detail: string; // or SessionDetail[] if the string is actually JSON
  landingPageId: number;
};
type Props = {
  data: Order[];
};
function DisplayOrders({ data }: Props) {
  return (
    <Table>
      <TableCaption>The Orders</TableCaption>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead>ID</TableHead>
          <TableHead>Customer Email</TableHead>
          <TableHead>Bill Amount</TableHead>
          <TableHead>Zoom Links</TableHead>
          <TableHead>Session Details</TableHead>

          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.customer_email}</TableCell>
            <TableCell>${order.bill_amount / 100}</TableCell>
            <TableCell>{order.zoom_link}</TableCell>
            <TableCell>
              {JSON.parse(order.session_detail).map(
                (session: SessionDetail) => (
                  <div key={session.startTime}>
                    <p>Start Time: {session.startTime}</p>
                    <p>End Time: {session.endTime}</p>
                    <p>Available: {session.available ? "Yes" : "No"}</p>
                  </div>
                )
              )}
            </TableCell>
            <TableCell>
              <button>
                <Trash2Icon size={24} />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DisplayOrders;
