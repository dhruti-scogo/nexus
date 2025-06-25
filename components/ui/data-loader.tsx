import { Spinner } from "./spinner";
import { Skeleton } from "./skeleton";

interface DataLoaderProps {
  isLoading?: boolean;
  isError?: boolean;
  error?: Error;
  isEmpty?: boolean;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  children: React.ReactNode;
}

export function DataLoader({
  isLoading,
  isError,
  error,
  isEmpty,
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
}: DataLoaderProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        {loadingComponent || (
          <div className="flex items-center gap-3">
            <Spinner />
            <span className="text-sm text-muted-foreground">Loading data...</span>
          </div>
        )}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-8">
        {errorComponent || (
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-destructive">
              Failed to load data
            </div>
            <div className="text-xs text-muted-foreground">
              {error?.message || "An unexpected error occurred"}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex items-center justify-center py-8">
        {emptyComponent || (
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">No data available</div>
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
} 