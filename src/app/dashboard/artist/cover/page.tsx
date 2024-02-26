"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { uploadFile } from "@/actions/artist.action";
import { UploadButton, UploadDropzone } from "@/util/uploadthing";

export default function CoverImage() {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setError(null);
        setVideoPreview(URL.createObjectURL(selectedFile));
      } else {
        setError("Please select a image file");
        setVideoPreview(null);
      }
    }
  };

  const saveDb = async (data: { id: string; path: string }) => {
    try {
      const result = await uploadFile(data);
      if (result.success === false) {
        toast.error("Something went wrong");
        return;
      }

      if (result.err) {
        toast.error(result.err);
        return;
      }
      toast.success("Your landing page has been updated successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full py-10">
      <h1 className="text-3xl font-bold">Landing Page Cover Image</h1>
      <p>This is where you can edit the cover image of your landing page.</p>
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
          toast.success("Cover Image Uploaded");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
