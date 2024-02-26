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
type FaQsType = {
  id: number;
  question: string;
  answer: string;
  landingPageId: number;
  createdAt: Date;
  updatedAt: Date;
};
type Props = {
  data: FaQsType[];
};
function DisplayFaQs({ data }: Props) {
  return (
    <Table>
      <TableCaption>the FaQs of the landing page</TableCaption>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead>ID</TableHead>
          <TableHead>Question</TableHead>
          <TableHead>Answer</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((keypoint) => (
          <TableRow key={keypoint.id}>
            <TableCell>{keypoint.id}</TableCell>
            <TableCell>{keypoint.question}</TableCell>
            <TableCell>{keypoint.answer}</TableCell>
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

export default DisplayFaQs;
