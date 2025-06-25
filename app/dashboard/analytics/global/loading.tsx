import { Spinner } from "@/components/ui/spinner";
import { CardSkeleton, TableSkeleton } from "@/components/ui/skeleton";

export default function GlobalAnalyticsLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-48 rounded-md bg-muted animate-pulse" />
        <div className="h-4 w-64 rounded-md bg-muted animate-pulse" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6 space-y-4">
          <div className="space-y-2">
            <div className="h-5 w-40 rounded-md bg-muted animate-pulse" />
            <div className="h-4 w-32 rounded-md bg-muted animate-pulse" />
          </div>
          <TableSkeleton rows={5} />
        </div>
        
        <CardSkeleton />
      </div>
      
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="text-sm text-muted-foreground">Loading global analytics...</span>
        </div>
      </div>
    </div>
  );
} 