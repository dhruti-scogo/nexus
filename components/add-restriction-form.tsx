"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { addRestriction } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";

const formSchema = z.object({
  domain: z.string().min(2, {
    message: "Domain must be at least 2 characters.",
  }),
  time: z.coerce.number().min(1, {
    message: "Time must be at least 1 minute.",
  }),
});

export function AddRestrictionForm({ uid }: { uid: string }) {
  const { mutate } = useSWRConfig();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
      time: 60,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addRestriction({ uid, ...values });
      toast.success("Restriction added!");

      // Invalidate the table to show the new restriction
      mutate(["restrictions", uid]);

      form.reset();
    } catch (error) {
      toast.error("Failed to add restriction.");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="youtube.com" {...field} />
              </FormControl>
              <FormDescription>
                The domain you want to restrict.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time (minutes)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                The maximum time allowed per day.
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