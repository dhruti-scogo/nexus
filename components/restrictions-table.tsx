"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteRestriction, getUserRestrictions } from "@/lib/api";
import { Button } from "@/components/ui/button";
import useSWR from "swr";

export function RestrictionsTable({ uid }: { uid: string }) {
  const { data: restrictions, mutate } = useSWR(
    ["restrictions", uid],
    () => getUserRestrictions(uid)
  );

  const handleDelete = async (domain: string) => {
    await deleteRestriction(uid, domain);
    mutate(); // Re-fetches the data
  };

  if (!restrictions) {
    return <div>Loading restrictions...</div>;
  }

  return (
    <Table>
      <TableCaption>A list of your current restrictions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>UID</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Time (seconds)</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(restrictions ?? []).map((restriction) => (
          <TableRow key={restriction.id}>
            <TableCell className="font-medium">{uid}</TableCell>
            <TableCell>{restriction.domain}</TableCell>
            <TableCell>{restriction.time}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="destructive"
                onClick={() => handleDelete(restriction.domain)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 