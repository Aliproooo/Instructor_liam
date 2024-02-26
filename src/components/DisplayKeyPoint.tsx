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
type KeyPointType = {
  id: number;
  title: string;
  landingPageId: number;
  createdAt: Date;
  updatedAt: Date;
};
type Props = {
  data: KeyPointType[];
};
function DisplayKeyPoint({ data }: Props) {
  return (
    <Table>
      <TableCaption>the key points of the landing page</TableCaption>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead>ID</TableHead>
          <TableHead>Key Point</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((keypoint) => (
          <TableRow key={keypoint.id}>
            <TableCell>{keypoint.id}</TableCell>
            <TableCell>{keypoint.title}</TableCell>
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

export default DisplayKeyPoint;
