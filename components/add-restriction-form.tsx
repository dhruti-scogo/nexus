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
import { Badge } from "@/components/ui/badge";
import { addRestriction } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";

const formSchema = z.object({
  domain: z
    .string()
    .min(2, {
      message: "Domain must be at least 2 characters.",
    })
    .refine(
      (value) => {
        // Basic domain format validation
        const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return domainRegex.test(value);
      },
      {
        message: "Please enter a valid domain format (e.g., youtube.com, sub.example.org)",
      }
    ),
  time: z.coerce.number().min(0, {
    message: "Time must be at least 0 seconds.",
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

  // Common time presets in seconds
  const timePresets = [
    { label: "1 min", value: 60 },
    { label: "5 min", value: 300 },
    { label: "10 min", value: 600 },
    { label: "30 min", value: 1800 },
    { label: "1 hour", value: 3600 },
    { label: "2 hours", value: 7200 },
    { label: "4 hours", value: 14400 },
    { label: "8 hours", value: 28800 },
  ];

  const formatTimeDisplay = (seconds: number) => {
    if (seconds < 60) return `${seconds} sec`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min`;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addRestriction({ uid, ...values });
      toast.success("Restriction added!");

      // Invalidate the table to show the new restriction
      mutate(["restrictions", uid]);

      form.reset();
    } catch (error: any) {
      // Handle specific validation errors from 400 responses
      if (error.status === 400 && error.message) {
        // Check if it's a domain format error
        if (error.message.toLowerCase().includes('domain') && 
            (error.message.toLowerCase().includes('format') || 
             error.message.toLowerCase().includes('invalid'))) {
          // Set error on the domain field specifically
          form.setError("domain", {
            type: "manual",
            message: error.message,
          });
        } else {
          // For other validation errors, show as toast
          toast.error(error.message);
        }
      } else {
        toast.error("Failed to add restriction.");
      }
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
              <FormLabel>Time Limit</FormLabel>
              <div className="space-y-3">
                {/* Quick preset buttons */}
                <div className="flex flex-wrap gap-2">
                  {timePresets.map((preset) => (
                    <Badge
                      key={preset.value}
                      variant={field.value === preset.value ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-primary/80 transition-colors"
                      onClick={() => field.onChange(preset.value)}
                    >
                      {preset.label}
                    </Badge>
                  ))}
                </div>
                
                {/* Custom input */}
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Custom seconds"
                      {...field} 
                      className="flex-1"
                    />
                  </FormControl>
                  <div className="text-sm text-muted-foreground min-w-fit">
                    = {formatTimeDisplay(field.value || 0)}
                  </div>
                </div>
              </div>
              <FormDescription>
                Choose a preset or enter custom time in seconds. This is the maximum time allowed per day.
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