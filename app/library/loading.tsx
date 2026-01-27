import Skeleton from "../Components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-[1070px] w-full mx-auto px-6">
      <div className="py-10 w-full">
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-48 mb-2" />
        
        {/* Subtitle/Count Skeleton */}
        <Skeleton className="h-4 w-32 mb-6" />

        {/* Books Grid Skeleton */}
        <div className="flex flex-wrap gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="relative pt-8 px-3 pb-3 rounded max-w-[200px] w-full"
            >
              <Skeleton className="w-[172px] h-[172px] mb-2 rounded" />
              <Skeleton className="h-5 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
