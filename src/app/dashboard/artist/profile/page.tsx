"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { uploadProfile } from "@/actions/artist.action";
import { UploadDropzone } from "@/util/uploadthing";

export default function CoverImage() {
  const saveDb = async (data: { id: string; path: string }) => {
    try {
      const result = await uploadProfile(data);
      if (result.success === false) {
        toast.error("Something went wrong");
        return;
      }

      if (result.err) {
        toast.error(result.err);
        return;
      }
      toast.success("Your Profile Pic is Uploaded Successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full py-10">
      <h1 className="text-3xl font-bold">Landing Page Profile Image</h1>
      <p>This is where you can edit the profile image of your landing page.</p>
      <UploadDropzone
        appearance={{
          container: {
            backgroundColor: "white",
          },
          label: {
            color: "black",
          },
          button: {
            backgroundColor: "black",
          },
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("URL: ", res);
          console.log("PATh: ", res);
          saveDb({
            id: res[0].serverData.uploadedBy,
            path: res[0].url,
          });
          toast.success("Profile Image Uploaded");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
