"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import FormSchema from "@/util/form_schemas/request_vendor.schema";
import requestVendor from "@/actions/requestVendor.action";

export function RequestVendorForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      description: "",
      genre: "",
      stage_name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await requestVendor(data);
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Hammad" {...field} />
              </FormControl>
              <FormDescription>This is your real name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stage_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stage Name</FormLabel>
              <FormControl>
                <Input placeholder="Ray" {...field} />
              </FormControl>
              <FormDescription>this is you public display name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="0335-3463895" {...field} />
              </FormControl>
              <FormDescription>
                This is your public contact number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="I am teaching music for 10 years... "
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A short description of your work.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Music Genres</SelectLabel>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="hiphop">Hip Hop</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Select the genre you specialize in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
