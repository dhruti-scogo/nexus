"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users, Building2, Filter } from "lucide-react";
import { getAllUsers, getAllPods, getPodUsers } from "@/lib/api";
import { User } from "@/lib/types";

export function UserSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedUser = searchParams.get("uid");
  const selectedPod = searchParams.get("pod");

  const [users, setUsers] = useState<string[]>([]);
  const [pods, setPods] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      console.log("🔄 UserSelector: Fetching data...");
      setLoading(true);

      // Fetch all pods
      const podsData = await getAllPods();
      console.log("📊 UserSelector: Pods data:", podsData);
      // Filter out empty string values with null check
      setPods((podsData?.pods || []).filter((pod) => pod && pod.trim() !== ""));

      // If a pod is selected, fetch users for that pod
      if (selectedPod) {
        console.log("👥 UserSelector: Fetching users for pod:", selectedPod);
        const podUsersData = await getPodUsers(selectedPod);
        console.log("👥 UserSelector: Pod users data:", podUsersData);
        // Filter out empty string values with null check
        setUsers(
          (podUsersData?.users || [])
            .map((user) => user.uid)
            .filter((uid) => uid && uid.trim() !== "")
        );
      } else {
        // Otherwise, fetch all users
        console.log("👥 UserSelector: Fetching all users");
        const usersData = await getAllUsers();
        console.log("👥 UserSelector: All users data:", usersData);
        // Filter out empty string values with null check
        setUsers(
          (usersData?.users || []).filter((uid) => uid && uid.trim() !== "")
        );
      }
      console.log("✅ UserSelector: Data fetched successfully");
    } catch (error) {
      console.error("❌ UserSelector: Error fetching data:", error);
      // Set empty arrays on error to prevent undefined issues
      setPods([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [selectedPod]);

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
  };

  const handleUserChange = (uid: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("uid", uid);
    if (selectedPod) {
      params.set("pod", selectedPod);
    }
    router.push(`/dashboard/analytics?${params.toString()}`);
  };

  const handlePodChange = (pod: string) => {
    const params = new URLSearchParams();
    if (pod === "all") {
      // Remove pod filter and show all users
      router.push("/dashboard/analytics");
    } else {
      params.set("pod", pod);
      router.push(`/dashboard/analytics?${params.toString()}`);
    }
  };

  // Show loading state until mounted to prevent hydration mismatch
  if (!mounted || loading) {
    return (
      <div className="flex gap-4 max-w-md">
        <div className="flex-1">
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Loading..." />
            </SelectTrigger>
          </Select>
        </div>
        <div className="flex-1">
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Loading..." />
            </SelectTrigger>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 rounded-2xl border border-slate-300/40 dark:border-slate-600/40 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-lg shadow-md">
          <Users className="h-5 w-5 text-slate-100" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            User Selection
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Filter and select users for analytics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* Pod Filter */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-md">
              <Building2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Pod Filter
            </label>
          </div>
          <Select onValueChange={handlePodChange} value={selectedPod ?? "all"}>
            <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 shadow-sm transition-all duration-200 rounded-xl">
              <SelectValue placeholder="Filter by pod" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 dark:border-slate-700">
              <SelectItem
                value="all"
                className="flex items-center gap-2 rounded-lg"
              >
                <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                All Pods
              </SelectItem>
              {pods.map((pod) => (
                <SelectItem
                  key={pod}
                  value={pod}
                  className="flex items-center gap-2 rounded-lg"
                >
                  <Building2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  {pod}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* User Selector */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-md">
              <Users className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              User
            </label>
          </div>
          <Select
            onValueChange={handleUserChange}
            value={selectedUser ?? undefined}
          >
            <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 shadow-sm transition-all duration-200 rounded-xl">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 dark:border-slate-700">
              {users.map((user) => (
                <SelectItem
                  key={user}
                  value={user}
                  className="flex items-center gap-2 rounded-lg"
                >
                  <Users className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  {user}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Refresh Button */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-md">
              <RefreshCw className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Refresh
            </label>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="w-full bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 dark:from-slate-800 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-600 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 shadow-sm transition-all duration-200 rounded-xl"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
