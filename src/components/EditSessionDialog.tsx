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

export default function SessionPriceDialog() {
  const [session_price, setSessionPrice] = useState("0");
  const handleSaveChanges = () => {
    toast(`Input value: ${session_price}`);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="col-span-1">Edit Session Price</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Session Price</DialogTitle>
          <DialogDescription>Enter The New Session Price </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="session-price" className="text-right">
              Price
            </Label>
            <Input
              type="number"
              id="name"
              value={session_price}
              onChange={(e) => setSessionPrice(e.target.value)}
              defaultValue="10"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
