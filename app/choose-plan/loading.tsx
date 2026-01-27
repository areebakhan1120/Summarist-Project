import Skeleton from "../Components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      {/* Plan Header Skeleton */}
      <div className="relative z-0 w-full text-center pt-12 mb-6 min-h-[400px] lg:min-h-[520px]">
         <div className="absolute inset-0 bg-[#032b41] before:rounded-b-[10rem] lg:before:rounded-b-[16rem] z-[-1] rounded-b-[10rem] lg:rounded-b-[16rem]"></div>
         <div className="max-w-[1000px] mx-auto px-6 flex flex-col items-center">
             <Skeleton className="h-12 w-3/4 bg-gray-600/50 mb-10" />
             <Skeleton className="h-6 w-1/2 bg-gray-600/50 mb-8" />
             <div className="flex justify-center h-[220px] translate-y-14 w-full max-w-[340px]">
                 <Skeleton className="w-full h-full rounded-t-[180px] bg-gray-600/50" />
             </div>
         </div>
      </div>

      {/* Landing/Plans Skeleton */}
      <div className="max-w-[1070px] w-full mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[800px] mx-auto mb-14">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
          </div>

          <Skeleton className="h-8 w-64 mx-auto mb-6" />

           <div className="flex flex-col gap-4 max-w-[680px] mx-auto">
             <Skeleton className="h-32 w-full rounded border-4 border-gray-100" />
             <Skeleton className="h-32 w-full rounded border-4 border-gray-100" />
           </div>
      </div>
    </div>
  );
}
