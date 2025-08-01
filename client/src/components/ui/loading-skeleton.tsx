interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-muted rounded-md ${className}`} />
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="p-6 border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <Skeleton className="w-12 h-4" />
      </div>
      <Skeleton className="w-24 h-4 mb-1" />
      <Skeleton className="w-32 h-8 mb-2" />
      <Skeleton className="w-28 h-3" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="p-6 border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Skeleton className="w-32 h-6 mb-2" />
          <Skeleton className="w-48 h-4" />
        </div>
        <Skeleton className="w-8 h-8 rounded" />
      </div>
      <Skeleton className="w-full h-64" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="p-6 border rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="w-40 h-6 mb-2" />
          <Skeleton className="w-64 h-4" />
        </div>
        <div className="flex space-x-3">
          <Skeleton className="w-64 h-10" />
          <Skeleton className="w-40 h-10" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-8 gap-4 p-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-8 gap-4 p-2">
            {Array.from({ length: 8 }).map((_, j) => (
              <Skeleton key={j} className="h-4" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}