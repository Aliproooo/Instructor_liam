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
import FaQFormSchema from "@/util/form_schemas/faq.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { create_faq } from "@/actions/artist.action";
import { revalidatePath } from "next/cache";

type FormSchema = z.infer<typeof FaQFormSchema>;

type Props = {
  revalidate: () => void;
};
export default function AddFaqDialog({ revalidate }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(FaQFormSchema),
    defaultValues: {
      question: "",
      ans: "",
    },
  });

  const handleSaveChanges = async (data: FormSchema) => {
    const result = await create_faq(data);
    console.log(result);
    if (!result) {
      toast.error("Something went wrong. Please try again later.");
      return;
    }

    if (result.error) {
      toast.error(result.error.toString());
      return;
    }
    // toast.success(`Input value: ${JSON.stringify(data, null, 2)}`);
    toast.success("Faq has been added successfully");
    setOpen(false);
    revalidate();
  };

  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>
        <Button className="col-span-1">Add FaQ</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add FaQ</DialogTitle>
          <DialogDescription>
            Add A Question and Answer that will show on your landing page
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveChanges)}>
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input placeholder="Question" {...field} />
                    </FormControl>
                    <FormDescription>The Question</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ans"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Input placeholder="Ans" {...field} />
                    </FormControl>
                    <FormDescription>The Answer</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button onClick={form.handleSubmit(handleSaveChanges)} type="submit">
            Add FaQ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
