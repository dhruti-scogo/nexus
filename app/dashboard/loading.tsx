import { Spinner } from "@/components/ui/spinner";
import { CardSkeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3">
          <Spinner size="lg" />
          <span className="text-lg font-medium">Loading dashboard...</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
} 