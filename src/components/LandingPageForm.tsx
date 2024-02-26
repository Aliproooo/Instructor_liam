"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import FormSchema from "@/util/form_schemas/landing_page.schema";
import { Separator } from "@/components/ui/separator";
import { create_landing_page } from "@/actions/artist.action";
import Link from "next/link";

interface LandingPageData {
  id: number;
  externalId: string;
  tagline: string;
  tagline_description: string;
  name: string;
  description: string;
}

interface SocialLink {
  id: number;
  name: string;
  url: string;
  landingPageId: number;
  createdAt: Date;
  updatedAt: Date;
}
interface SocialGroup {
  [key: string]: SocialLink[];
}
type Props = {
  formDefaultValues: LandingPageData | null;
  socials: SocialGroup | undefined;
};

function LandingPageForm({ formDefaultValues, socials }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tagline: "",
      tagline_description: "",
      artist_name: "",
      description: "",
      facebook: "",
      youtube: "",
      instagram: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await create_landing_page(data);
    console.log(result);
    if (!result) {
      toast.error("Something went wrong. Please try again later.");
      return;
    }

    if (result.error) {
      toast.error(result.error.toString());
      return;
    }

    toast.success("Your landing page has been created successfully.");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Personal Details</h1>
          <p>personal detail that will show on your landing page</p>
        </div>
        <FormField
          control={form.control}
          name="tagline"
          defaultValue={formDefaultValues?.tagline}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input placeholder="Tagline" {...field} />
              </FormControl>
              <FormDescription>
                This is the tagline/Title of your landing page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tagline_description"
          defaultValue={formDefaultValues?.tagline_description}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline Description</FormLabel>
              <FormControl>
                <Input placeholder="tagline_description" {...field} />
              </FormControl>
              <FormDescription>
                This is the description of your landing page/work that will show
                below your tagline.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="artist_name"
          defaultValue={formDefaultValues?.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will display on your landing page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          defaultValue={formDefaultValues?.description}
          render={({ field }) => (
            <FormItem>
              <FormLabel> Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
                This is the description of your landing page/work.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div>
          <h1 className="text-3xl font-bold">Socials</h1>
          <p className="mt-2">Your Social Links</p>
        </div>

        <FormField
          control={form.control}
          name="facebook"
          defaultValue={socials?.Facebook[0].url}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Facebook</FormLabel>
              <FormControl>
                <Input placeholder="Your Facebook Link" {...field} />
              </FormControl>
              <FormDescription>This is your facebook link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="youtube"
          defaultValue={socials?.Youtube[0].url}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Youtube</FormLabel>
              <FormControl>
                <Input placeholder="Your Youtube Link" {...field} />
              </FormControl>
              <FormDescription>This is your Youtube link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagram"
          defaultValue={socials?.Instagram[0].url}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input placeholder="Your Instagram Link" {...field} />
              </FormControl>
              <FormDescription>This is your Instagram link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Button className="ml-10">
          <Link href="dashboard/artist/landing-page/view">
            View Existing Data
          </Link>
        </Button>
      </form>
    </Form>
  );
}

export default LandingPageForm;
