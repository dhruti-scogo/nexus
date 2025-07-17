"use client";

import { useState } from "react";
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
import { DigitalClock } from "./digital-clock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
} from "lucide-react";

export function RestrictionsManager({
  initialUid,
  allUsers,
}: {
  initialUid: string;
  allUsers: string[];
}) {
  const [displayUid, setDisplayUid] = useState(initialUid);

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

      <div className="grid gap-8 md:grid-cols-1 xl:grid-cols-6 w-full">
        <Card className="col-span-2 border-l-4 border-l-slate-600 dark:border-l-slate-500 shadow-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6">
            <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200 text-xl font-semibold">
              <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-lg shadow-md">
                <Users className="h-5 w-5 text-slate-100" />
              </div>
              Users
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mt-2 font-medium">
              <UserCheck className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              Select a user to view their restrictions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ScrollArea className="h-96 pr-4">
              <div className="space-y-3">
                {(allUsers ?? []).map((user) => (
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
                ))}
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
