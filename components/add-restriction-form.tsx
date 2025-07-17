"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "@/components/ui/loading-button";
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
import { addRestriction, addPodRestriction } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";
import { useState, useEffect } from "react";
import { getAllPods } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Globe,
  Clock,
  Building2,
  User,
  Plus,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const formSchema = z.object({
  domain: z.string().min(1, {
    message: "Domain must not be empty.",
  }),
  time: z.coerce.number().min(0, {
    message: "Time must be at least 0 seconds.",
  }),
  restrictionType: z.enum(["single", "pod"]),
  podName: z.string().optional(),
});

export function AddRestrictionForm({
  uid,
  defaultMode = "single",
}: {
  uid: string;
  defaultMode?: "single" | "pod";
}) {
  const { mutate } = useSWRConfig();
  const [pods, setPods] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
      time: 60,
      restrictionType: defaultMode,
      podName: "",
    },
  });

  const restrictionType = form.watch("restrictionType");

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchPods = async () => {
      try {
        const podsData = await getAllPods();
        // Filter out empty string values with null check
        setPods(
          (podsData?.pods || []).filter((pod) => pod && pod.trim() !== "")
        );
      } catch (error) {
        console.error("Error fetching pods:", error);
        // Set empty array on error to prevent undefined issues
        setPods([]);
      }
    };
    fetchPods();
  }, [mounted]);

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
      setLoading(true);

      if (values.restrictionType === "pod") {
        if (!values.podName) {
          toast.error("Please select a pod");
          return;
        }

        await addPodRestriction({
          podName: values.podName,
          domainName: values.domain,
          time: values.time,
        });
        toast.success(`Restriction applied to pod: ${values.podName}`);
      } else {
        await addRestriction({ uid, ...values });
        toast.success("Restriction added!");
      }

      // Invalidate the table to show the new restriction
      mutate(["restrictions", uid]);

      form.reset({
        domain: "",
        time: 60,
        restrictionType: "single",
        podName: "",
      });
    } catch (error: any) {
      // Handle specific validation errors from 400 responses
      if (error.status === 400 && error.message) {
        // Check if it's a domain format error
        if (
          error.message.toLowerCase().includes("domain") &&
          (error.message.toLowerCase().includes("format") ||
            error.message.toLowerCase().includes("invalid"))
        ) {
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 rounded-lg border border-slate-300/40 dark:border-slate-600/40">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <Plus className="h-6 w-6 text-slate-600 dark:text-slate-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {restrictionType === "pod"
              ? "Add Pod Restriction"
              : "Add User Restriction"}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {restrictionType === "pod"
              ? "Apply restrictions to all users in a pod"
              : "Add domain restrictions for the selected user"}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Pod Selection (only show for pod restrictions) */}
          {restrictionType === "pod" && (
            <FormField
              control={form.control}
              name="podName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Building2 className="h-4 w-4" />
                    Select Pod
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                        <SelectValue placeholder="Choose a pod" />
                      </SelectTrigger>
                      <SelectContent>
                        {pods.map((pod) => (
                          <SelectItem
                            key={pod}
                            value={pod}
                            className="flex items-center gap-2"
                          >
                            <Building2 className="h-4 w-4" />
                            {pod}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Select the pod to apply this restriction to all users in
                    that pod.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Globe className="h-4 w-4" />
                  Domain
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="youtube.com or https://www.youtube.com/watch?v=example"
                    {...field}
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 focus:border-slate-500 dark:focus:border-slate-400"
                  />
                </FormControl>
                <FormDescription className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Enter a domain or full URL you want to restrict.
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
                <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Clock className="h-4 w-4" />
                  Time Limit
                </FormLabel>
                <div className="space-y-3">
                  {/* Quick preset buttons */}
                  <div className="flex flex-wrap gap-2">
                    {timePresets.map((preset) => (
                      <Badge
                        key={preset.value}
                        variant={
                          field.value === preset.value ? "default" : "secondary"
                        }
                        className={`cursor-pointer transition-colors ${
                          field.value === preset.value
                            ? "bg-slate-700 hover:bg-slate-800 text-slate-100"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                        }`}
                        onClick={() => field.onChange(preset.value)}
                      >
                        <Clock className="h-3 w-3 mr-1" />
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
                        className="flex-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 focus:border-slate-500 dark:focus:border-slate-400"
                      />
                    </FormControl>
                    <div className="text-sm text-slate-600 dark:text-slate-400 min-w-fit flex items-center gap-1">
                      <Clock className="h-4 w-4" />={" "}
                      {formatTimeDisplay(field.value || 0)}
                    </div>
                  </div>
                </div>
                <FormDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Choose a preset or enter custom time in seconds. This is the
                  maximum time allowed per day.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            type="submit"
            loading={loading}
            loadingText={
              restrictionType === "pod"
                ? "Applying pod restriction..."
                : "Adding restriction..."
            }
            className="bg-slate-700 hover:bg-slate-800 text-slate-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            {restrictionType === "pod" ? "Apply to Pod" : "Submit"}
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
