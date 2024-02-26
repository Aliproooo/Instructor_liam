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
import { create_key_point } from "@/actions/artist.action";

type Props = {
  revalidate: () => void;
};

export default function AddKeyPointDialog({ revalidate }: Props) {
  const [keypoint, setKeypoint] = useState("");
  const [open, setOpen] = useState(false);

  const handleSaveChanges = async () => {
    const result = await create_key_point(keypoint);
    console.log(result);
    if (!result) {
      toast.error("Something went wrong. Please try again later.");
      return;
    }

    if (result.error) {
      toast.error(result.error.toString());
      return;
    }

    toast.success(
      "Your request has been submitted successfully. We will notify you soon."
    );
    setOpen(false);
    revalidate();
  };

  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>
        <Button className="col-span-1">Add Keypoint</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Keypoint</DialogTitle>
          <DialogDescription>
            Add a new Keypoint to the website landing page describing a benefit
            of buying your session
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="session-price" className="text-right">
              Key Point
            </Label>
            <Input
              value={keypoint}
              onChange={(e) => setKeypoint(e.target.value)}
              type="keypoint"
              id="text"
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
