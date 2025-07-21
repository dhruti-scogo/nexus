"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AddRestrictionForm } from "./add-restriction-form";
import { BulkRestrictionForm } from "./bulk-restriction-form";
import { RestrictionsTable } from "./restrictions-table";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DigitalClock } from "./digital-clock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Users,
  Shield,
  Settings,
  Plus,
  Lock,
  Clock,
  UserCheck,
  Building2,
  Users2,
  Filter,
  RefreshCw,
  Search,
} from "lucide-react";
import { getAllPods, getPodUsers, getAllUsers } from "@/lib/api";

export function RestrictionsManager({
  initialUid,
  allUsers,
}: {
  initialUid: string;
  allUsers: string[];
}) {
  const [displayUid, setDisplayUid] = useState(initialUid);
  const [selectedPod, setSelectedPod] = useState<string>("all");
  const [pods, setPods] = useState<string[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<string[]>(allUsers || []);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  console.log("Component props - allUsers:", allUsers);
  console.log("Current state - selectedPod:", selectedPod);
  console.log("Current state - filteredUsers:", filteredUsers);

  // Fetch pods on component mount
  useEffect(() => {
    const fetchPods = async () => {
      try {
        const podsData = await getAllPods();
        console.log("Pods data received:", podsData);
        setPods(podsData?.pods || []);
      } catch (error) {
        console.error("Failed to fetch pods:", error);
        setPods([]);
      }
    };
    fetchPods();
  }, []);

  // Update filtered users when allUsers prop changes
  useEffect(() => {
    if (selectedPod === "all") {
      setFilteredUsers(allUsers || []);
    }
  }, [allUsers, selectedPod]);

  // Handle pod selection and filter users
  useEffect(() => {
    console.log("Pod selection changed to:", selectedPod);

    const filterUsersByPod = async () => {
      if (selectedPod === "all") {
        console.log("Setting all users:", allUsers);
        setFilteredUsers(allUsers || []);
        return;
      }

      setIsLoading(true);
      try {
        console.log("Fetching users for pod:", selectedPod);
        console.log(
          "API URL will be:",
          `https://backend.prasadpatra.dev/api/pods/${selectedPod}/users`
        );

        const podUsersData = await getPodUsers(selectedPod);
        console.log("Pod users data received:", podUsersData);
        console.log("Selected pod:", selectedPod);

        // Handle different possible response structures
        let userList: string[] = [];

        try {
          if (podUsersData?.users && Array.isArray(podUsersData.users)) {
            // If response has users array with User objects
            userList = podUsersData.users.map((user: any) => user.uid || user);
          } else if (Array.isArray(podUsersData)) {
            // If response is directly an array of User objects
            userList = podUsersData.map((user: any) => user.uid || user);
          } else if (podUsersData?.users && Array.isArray(podUsersData.users)) {
            // If response has users array with string UIDs
            userList = (podUsersData.users as any[]).filter(
              (item: any) => typeof item === "string"
            );
          } else {
            console.log("Unexpected response structure:", podUsersData);
            userList = [];
          }
        } catch (error) {
          console.error("Error processing pod users data:", error);
          userList = [];
        }

        console.log("Final user list for pod:", userList);
        setFilteredUsers(userList);
      } catch (error) {
        console.error("Failed to fetch pod users:", error);
        setFilteredUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    filterUsersByPod();
  }, [selectedPod, allUsers]);

  // Filter users based on search query
  const getDisplayUsers = () => {
    if (!searchQuery.trim()) {
      return filteredUsers;
    }

    return filteredUsers.filter((user) =>
      user.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="space-y-6 w-full mx-auto">
      {/* Header with Clock */}
      <div className="flex justify-between items-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-8 rounded-2xl border border-slate-300/40 dark:border-slate-600/40 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-xl shadow-lg">
            <Shield className="h-8 w-8 text-slate-100" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent tracking-tight">
              Restrictions Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2 mt-2 font-medium">
              <Settings className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              Manage domain restrictions and time limits with precision
            </p>
          </div>
        </div>
        <DigitalClock />
      </div>

      <div className="grid gap-8 md:grid-cols-1 xl:grid-cols-6 w-full max-w-full mx-auto">
        <Card className="col-span-2 border-l-4 border-l-slate-600 dark:border-l-slate-500 shadow-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200 text-xl font-semibold">
                <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-lg shadow-md">
                  <Users className="h-5 w-5 text-slate-100" />
                </div>
                Users
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedPod} onValueChange={setSelectedPod}>
                  <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                    <SelectValue placeholder="Select Pod" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pods</SelectItem>
                    {(pods || []).map((pod) => (
                      <SelectItem key={pod} value={pod}>
                        {pod}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Search Bar and User Count */}
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 mr-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-slate-500 dark:focus:border-slate-400 w-full"
                />
              </div>
              <span className="text-base text-slate-700 dark:text-slate-100 bg-slate-300 dark:bg-slate-800 rounded-full px-5 py-2 shadow-md ml-2 whitespace-nowrap transition-all duration-200">
                {getDisplayUsers().length} user
                {getDisplayUsers().length !== 1 ? "s" : ""}
              </span>
            </div>
            <CardDescription className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
              <UserCheck className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              {selectedPod === "all"
                ? "Select a user to view their restrictions"
                : `Users in ${selectedPod} pod`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ScrollArea className="h-[950px] pr-4">
              <div className="space-y-3">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Loading users...</span>
                    </div>
                  </div>
                ) : getDisplayUsers().length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <UserCheck className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {searchQuery.trim()
                          ? `No users found matching "${searchQuery}"`
                          : selectedPod === "all"
                          ? "No users found"
                          : `No users found in ${selectedPod} pod`}
                      </p>
                    </div>
                  </div>
                ) : (
                  getDisplayUsers().map((user) => (
                    <Button
                      key={user}
                      variant={displayUid === user ? "default" : "ghost"}
                      className={`w-full justify-start transition-all duration-300 rounded-xl p-4 h-auto ${
                        displayUid === user
                          ? "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-slate-100 shadow-lg transform scale-[1.02]"
                          : "hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-800 dark:hover:to-slate-700 hover:text-slate-800 dark:hover:text-slate-200 hover:shadow-md"
                      }`}
                      onClick={() => setDisplayUid(user)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div
                          className={`p-2 rounded-lg ${
                            displayUid === user
                              ? "bg-slate-100/20"
                              : "bg-slate-100 dark:bg-slate-800"
                          }`}
                        >
                          <UserCheck
                            className={`h-4 w-4 ${
                              displayUid === user
                                ? "text-slate-100"
                                : "text-slate-600 dark:text-slate-400"
                            }`}
                          />
                        </div>
                        <span className="font-medium">{user}</span>
                      </div>
                    </Button>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="col-span-4 space-y-8">
          <Card className="border-l-4 border-l-slate-600 dark:border-l-slate-500 shadow-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6">
              <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200 text-xl font-semibold">
                <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-lg shadow-md">
                  <Lock className="h-5 w-5 text-slate-100" />
                </div>
                Restrictions for {displayUid}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mt-2 font-medium">
                <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                A comprehensive list of domains restricted for the selected user
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <RestrictionsTable uid={displayUid} />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-slate-600 dark:border-l-slate-500 shadow-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6">
              <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200 text-xl font-semibold">
                <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-lg shadow-md">
                  <Plus className="h-5 w-5 text-slate-100" />
                </div>
                Add Restrictions
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mt-2 font-medium">
                <Settings className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                Add new restrictions for users or pods with advanced controls
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="single" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 p-1 rounded-xl shadow-inner">
                  <TabsTrigger
                    value="single"
                    className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
                  >
                    <UserCheck className="h-4 w-4" />
                    Single User
                  </TabsTrigger>
                  <TabsTrigger
                    value="pod"
                    className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
                  >
                    <Building2 className="h-4 w-4" />
                    Pod-wide
                  </TabsTrigger>
                  <TabsTrigger
                    value="bulk"
                    className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
                  >
                    <Users2 className="h-4 w-4" />
                    Multi-User
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="single" className="mt-6">
                  <AddRestrictionForm uid={displayUid} defaultMode="single" />
                </TabsContent>

                <TabsContent value="pod" className="mt-6">
                  <AddRestrictionForm uid={displayUid} defaultMode="pod" />
                </TabsContent>

                <TabsContent value="bulk" className="mt-6">
                  <BulkRestrictionForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
