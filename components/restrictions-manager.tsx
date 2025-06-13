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
import { RestrictionsTable } from "./restrictions-table";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { DigitalClock } from "./digital-clock";


export function RestrictionsManager({
  initialUid,
  allUsers,
}: {
  initialUid: string;
  allUsers: string[];
}) {
  const [displayUid, setDisplayUid] = useState(initialUid);

  return (
    <div className="space-y-6">
      {/* Header with Clock */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Restrictions Dashboard</h1>
          <p className="text-muted-foreground">Manage domain restrictions and time limits</p>
        </div>
        <DigitalClock />
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 w-full">
        <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Select a user to view their restrictions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {(allUsers ?? []).map((user) => (
                <Button
                  key={user}
                  variant={displayUid === user ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setDisplayUid(user)}
                >
                  {user}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Restrictions for {displayUid}</CardTitle>
            <CardDescription>
              A list of domains restricted for the selected user.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RestrictionsTable uid={displayUid} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add Restriction</CardTitle>
            <CardDescription>
              Add a new restriction for {displayUid}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddRestrictionForm uid={displayUid} />
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
} 