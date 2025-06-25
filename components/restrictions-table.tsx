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
import { LoadingButton } from "@/components/ui/loading-button";
import { TableSkeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { useState } from "react";

export function RestrictionsTable({ uid }: { uid: string }) {
  const { data: restrictions, mutate, isLoading } = useSWR(
    ["restrictions", uid],
    () => getUserRestrictions(uid)
  );
  const [deletingDomain, setDeletingDomain] = useState<string | null>(null);

  const handleDelete = async (domain: string) => {
    setDeletingDomain(domain);
    try {
      await deleteRestriction(uid, domain);
      mutate(); // Re-fetches the data
    } finally {
      setDeletingDomain(null);
    }
  };

  if (isLoading) {
    return <TableSkeleton rows={3} />;
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
              <LoadingButton
                variant="destructive"
                size="sm"
                loading={deletingDomain === restriction.domain}
                loadingText="Deleting..."
                onClick={() => handleDelete(restriction.domain)}
              >
                Delete
              </LoadingButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 