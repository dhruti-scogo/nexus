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
import {
  Trash2,
  Clock,
  Globe,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export function RestrictionsTable({ uid }: { uid: string }) {
  const {
    data: restrictions,
    mutate,
    isLoading,
  } = useSWR(["restrictions", uid], () => getUserRestrictions(uid));
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

  if (!restrictions || restrictions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl inline-block mb-6">
          <CheckCircle className="h-16 w-16 text-slate-600 dark:text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
          No Restrictions Found
        </h3>
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          This user has no active domain restrictions at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <Table>
        <TableCaption className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 py-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-1.5 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-lg shadow-md">
              <AlertTriangle className="h-4 w-4 text-slate-100" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">
              Active Restrictions ({restrictions.length})
            </span>
          </div>
        </TableCaption>
        <TableHeader className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
          <TableRow>
            <TableHead className="text-slate-800 dark:text-slate-200 font-semibold">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-md">
                  <User className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </div>
                User ID
              </div>
            </TableHead>
            <TableHead className="text-slate-800 dark:text-slate-200 font-semibold">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-md">
                  <Globe className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </div>
                Domain
              </div>
            </TableHead>
            <TableHead className="text-slate-800 dark:text-slate-200 font-semibold">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-md">
                  <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </div>
                Time Limit (seconds)
              </div>
            </TableHead>
            <TableHead className="text-right text-slate-800 dark:text-slate-200 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(restrictions ?? []).map((restriction) => (
            <TableRow
              key={restriction.id}
              className="hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-800 dark:hover:to-slate-700 transition-all duration-200"
            >
              <TableCell className="font-semibold text-slate-800 dark:text-slate-200">
                {uid}
              </TableCell>
              <TableCell className="font-mono text-sm bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2">
                {restriction.domain}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {restriction.time}s
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <LoadingButton
                  variant="destructive"
                  size="sm"
                  loading={deletingDomain === restriction.domain}
                  loadingText="Deleting..."
                  onClick={() => handleDelete(restriction.domain)}
                  className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-slate-100 shadow-lg rounded-xl px-4 py-2 transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
