"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function EditDiscountDialog() {
  const [discount, setDiscount] = useState("0");
  const handleSaveChanges = () => {
    toast(`Input value: ${discount}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="col-span-1">Edit Discount Percentage</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Discount Percentage</DialogTitle>
          <DialogDescription>
            Enter The New Edit Discount Percentage enter 0 if you want the
            discount to be turned off
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="session-price" className="text-right">
              Price
            </Label>
            <Input
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              type="number"
              id="name"
              defaultValue="10"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
