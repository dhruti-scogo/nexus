import { Spinner } from "@/components/ui/spinner";

export default function GlobalLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-3">
        <Spinner size="lg" />
        <span className="text-lg font-medium">Loading...</span>
      </div>
    </div>
  );
} 