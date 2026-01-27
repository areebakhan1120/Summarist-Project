import Skeleton from "../../Components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="relative w-full h-[calc(100vh-160px)]">
      <div className="p-6 max-w-3xl mx-auto mb-24">
        {/* Title Skeleton */}
        <div className="border-b border-[#e1e7ea] mb-8 pb-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
        </div>

        {/* Summary Text Skeleton */}
        <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
             <div className="h-4" /> {/* Spacer */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
        </div>
      </div>

      {/* Audio Player Skeleton */}
      <div className="fixed bottom-0 left-0 w-full h-[80px] bg-white border-t border-[#e1e7ea] flex items-center px-4 lg:px-8 z-40">
         <div className="flex items-center gap-4 w-full max-w-[1070px] mx-auto">
            {/* Book Info */}
            <div className="flex items-center gap-4 w-[300px]">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
             {/* Controls (simplified) */}
             <div className="flex-1 flex justify-center gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
             </div>
         </div>
      </div>
    </div>
  );
}
