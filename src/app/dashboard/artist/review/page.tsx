"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/util/uploadthing";

type Props = {};

function Page({}: Props) {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("video/")) {
        setFile(selectedFile);
        setError(null);
        setVideoPreview(URL.createObjectURL(selectedFile));
      } else {
        setError("Please select a video file");
        setVideoPreview(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      console.log("File submitted:", file);
      toast.success("Your landing page has been created successfully.");
    }
  };

  return (
    <div className="w-full pt-10">
      <h1 className="text-3xl font-bold">Add Reviews to Your Landing Page</h1>
      <p className="pb-10">
        Here is the editor where you can add reviews to your landing page{" "}
      </p>
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
        content={{ allowedContent: "Videos (16MB)" }}
        endpoint="videoUpload"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          toast.success("Cover Image Uploaded");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

export default Page;
