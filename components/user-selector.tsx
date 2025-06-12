"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserSelector({ users }: { users: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedUser = searchParams.get("uid");

  const handleValueChange = (uid: string) => {
    router.push(`/dashboard/analytics?uid=${uid}`);
  };

  return (
    <div className="max-w-xs">
      <Select onValueChange={handleValueChange} value={selectedUser ?? undefined}>
        <SelectTrigger>
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user} value={user}>
              {user}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 