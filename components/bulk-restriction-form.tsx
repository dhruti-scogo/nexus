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
import {
  addBulkRestrictions,
  getAllUsers,
  getAllPods,
  getPodUsers,
} from "@/lib/api";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";
import { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  RefreshCw,
  Globe,
  Clock,
  Users,
  Building2,
  Plus,
  CheckSquare,
  Square,
  Filter,
} from "lucide-react";
import { User } from "@/lib/types";

const formSchema = z.object({
  domain: z.string().min(1, {
    message: "Domain must not be empty.",
  }),
  time: z.coerce.number().min(0, {
    message: "Time must be at least 0 seconds.",
  }),
  selectedUsers: z.array(z.string()).min(1, {
    message: "Please select at least one user.",
  }),
});

export function BulkRestrictionForm() {
  const { mutate } = useSWRConfig();
  const [pods, setPods] = useState<string[]>([]);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [podUsers, setPodUsers] = useState<Record<string, User[]>>({});
  const [selectedPod, setSelectedPod] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [podLoading, setPodLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
      time: 60,
      selectedUsers: [],
    },
  });

  const selectedUsers = form.watch("selectedUsers");

  // Get filtered users based on selected pod
  const getFilteredUsers = () => {
    console.log("🔍 Filtering users - selectedPod:", selectedPod);
    console.log("🔍 Available pod users:", Object.keys(podUsers));
    console.log("🔍 All users:", allUsers);

    if (selectedPod && selectedPod !== "all") {
      if (podUsers[selectedPod]) {
        const podUserIds = podUsers[selectedPod].map((user) => user.uid);
        console.log("🔍 Users for pod", selectedPod, ":", podUserIds);
        return podUserIds;
      } else {
        console.log(
          "🔍 No cached users for pod",
          selectedPod,
          "- returning empty array"
        );
        return [];
      }
    }
    console.log("🔍 Returning all users:", allUsers);
    return allUsers;
  };

  const filteredUsers = getFilteredUsers();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      console.log("🔄 Fetching data...");
      // Fetch all pods and users
      const [podsData, usersData] = await Promise.all([
        getAllPods(),
        getAllUsers(),
      ]);

      console.log("📊 Pods data:", podsData);
      console.log("👥 Users data:", usersData);

      // Filter out empty string values with null checks
      setPods((podsData?.pods || []).filter((pod) => pod && pod.trim() !== ""));
      setAllUsers(
        (usersData?.users || []).filter((uid) => uid && uid.trim() !== "")
      );

      console.log("✅ Data fetched successfully");
      console.log(
        "📋 Filtered pods:",
        (podsData?.pods || []).filter((pod) => pod && pod.trim() !== "")
      );
      console.log(
        "👤 Filtered users:",
        (usersData?.users || []).filter((uid) => uid && uid.trim() !== "")
      );
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      // Set empty arrays on error to prevent undefined issues
      setPods([]);
      setAllUsers([]);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    fetchData();
  }, [mounted, fetchData]);

  // Refresh data when page becomes visible (user returns to tab)
  useEffect(() => {
    if (!mounted) return;

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mounted, fetchData]);

  const handleRefresh = () => {
    fetchData();
    // Clear pod users cache to force refetch
    setPodUsers({});
  };

  useEffect(() => {
    if (!mounted) return;

    const fetchPodUsers = async () => {
      if (selectedPod && selectedPod !== "all") {
        console.log("🔄 Fetching users for pod:", selectedPod);
        setPodLoading(true);
        try {
          const podUsersData = await getPodUsers(selectedPod);
          console.log("📊 Pod users data received:", podUsersData);

          // Handle different response structures
          let users: User[] = [];
          if (podUsersData?.users && Array.isArray(podUsersData.users)) {
            users = podUsersData.users;
          } else if (Array.isArray(podUsersData)) {
            users = podUsersData;
          }

          const filteredUsers = users.filter(
            (user) => user.uid && user.uid.trim() !== ""
          );
          console.log("✅ Filtered pod users:", filteredUsers);

          setPodUsers((prev) => ({
            ...prev,
            [selectedPod]: filteredUsers,
          }));
        } catch (error) {
          console.error("❌ Error fetching pod users:", error);
          // Set empty array on error
          setPodUsers((prev) => ({
            ...prev,
            [selectedPod]: [],
          }));
        } finally {
          setPodLoading(false);
        }
      }
    };

    // Always fetch when pod changes, not just when not cached
    if (selectedPod && selectedPod !== "all") {
      fetchPodUsers();
    }
  }, [selectedPod, mounted]);

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

  const handleSelectAllUsers = () => {
    form.setValue("selectedUsers", filteredUsers);
  };

  const handleDeselectAllUsers = () => {
    form.setValue("selectedUsers", []);
  };

  const handleSelectPodUsers = () => {
    if (selectedPod && selectedPod !== "all" && podUsers[selectedPod]) {
      const podUserIds = podUsers[selectedPod].map((user) => user.uid);
      form.setValue("selectedUsers", podUserIds);
    }
  };

  const handleUserToggle = (userId: string) => {
    const currentSelected = form.getValues("selectedUsers");
    const isSelected = currentSelected.includes(userId);

    if (isSelected) {
      form.setValue(
        "selectedUsers",
        currentSelected.filter((id) => id !== userId)
      );
    } else {
      form.setValue("selectedUsers", [...currentSelected, userId]);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      await addBulkRestrictions({
        userIds: values.selectedUsers,
        domainName: values.domain,
        time: values.time,
      });

      toast.success(
        `Restriction applied to ${values.selectedUsers.length} user(s)`
      );

      // Reset form
      form.reset({
        domain: "",
        time: 60,
        selectedUsers: [],
      });
    } catch (error: any) {
      if (error.status === 400 && error.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to apply bulk restrictions.");
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
          <Users className="h-6 w-6 text-slate-600 dark:text-slate-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            Bulk User Restrictions
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Apply restrictions to multiple users at once
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-base font-semibold">
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
                <FormDescription className="flex items-center gap-2 text-sm">
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
                <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-base font-semibold">
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
                <FormDescription className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  Choose a preset or enter custom time in seconds. This is the
                  maximum time allowed per day.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* User Selection */}
          <FormField
            control={form.control}
            name="selectedUsers"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-base font-semibold">
                  <Users className="h-4 w-4" />
                  Select Users ({selectedUsers.length} selected)
                </FormLabel>

                {/* Quick Actions */}
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAllUsers}
                    className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                  >
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Select All
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDeselectAllUsers}
                    className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Deselect All
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    className="ml-auto bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                {/* Pod Filter */}
                <div className="mb-4">
                  <label className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                    Filter by Pod
                  </label>
                  <Select
                    onValueChange={setSelectedPod}
                    value={selectedPod || "all"}
                  >
                    <SelectTrigger className="w-64 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <SelectValue placeholder="Filter by pod (optional)" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="all"
                        className="flex items-center gap-2"
                      >
                        All Pods
                      </SelectItem>
                      {pods.map((pod) => (
                        <SelectItem
                          key={pod}
                          value={pod}
                          className="flex items-center gap-2"
                        >
                          {pod}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* User List */}
                <ScrollArea className="h-64 border border-slate-200 dark:border-slate-600 rounded-md p-4 bg-white dark:bg-slate-800">
                  <div className="space-y-2">
                    {podLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Loading pod users...</span>
                        </div>
                      </div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <Users className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            {selectedPod === "all" || !selectedPod
                              ? "No users found"
                              : `No users found in ${selectedPod} pod`}
                          </p>
                        </div>
                      </div>
                    ) : (
                      filteredUsers.map((userId) => (
                        <div
                          key={userId}
                          className="flex items-center space-x-2 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded transition-colors"
                        >
                          <Checkbox
                            id={userId}
                            checked={selectedUsers.includes(userId)}
                            onCheckedChange={() => handleUserToggle(userId)}
                            className="text-slate-600 dark:text-slate-400"
                          />
                          <label
                            htmlFor={userId}
                            className="text-sm cursor-pointer flex items-center gap-2"
                          >
                            <Users className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                            {userId}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>

                <FormDescription className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  Select one or more users to apply the restriction to. You can
                  filter by pod to make selection easier.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            type="submit"
            loading={loading}
            loadingText="Applying bulk restrictions..."
            disabled={selectedUsers.length === 0}
            className="bg-slate-700 hover:bg-slate-800 text-slate-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Apply to {selectedUsers.length} User
            {selectedUsers.length !== 1 ? "s" : ""}
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
