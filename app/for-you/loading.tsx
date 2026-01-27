import Skeleton from "../Components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      {/* Selected Book Skeleton */}
      <div className="flex justify-between w-full lg:w-[calc((100%/3)*2)] bg-[#fbefd6] rounded p-6 mb-6 gap-6 flex-col sm:flex-row animate-pulse">
        <div className="w-full sm:w-2/5 flex flex-col gap-2">
          <Skeleton className="h-6 w-3/4 bg-gray-300" />
          <Skeleton className="h-4 w-1/2 bg-gray-300" />
        </div>
        <div className="hidden sm:block w-px bg-gray-300"></div>
        <div className="flex gap-4 w-full sm:w-3/5">
            <Skeleton className="h-[140px] w-[140px] rounded" />
            <div className="w-full flex flex-col gap-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex items-center gap-2 mt-auto">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
        </div>
      </div>

      {/* Recommended Section Skeleton */}
      <div className="py-10 w-full">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-32 mb-8" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[200px]">
                <Skeleton className="h-[240px] w-full rounded-md mb-2" />
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Section Skeleton */}
       <div className="py-10 w-full">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-32 mb-8" />
        <div className="flex gap-4 overflow-hidden">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[200px]">
                <Skeleton className="h-[240px] w-full rounded-md mb-2" />
                 <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
