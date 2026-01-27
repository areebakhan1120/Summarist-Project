import Skeleton from "./Components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      {/* Navbar Skeleton */}
      <div className="h-20 w-full flex items-center justify-between px-6 lg:px-24 mb-8">
         <Skeleton className="h-10 w-40" />
         <div className="hidden md:flex gap-8">
             <Skeleton className="h-4 w-20" />
             <Skeleton className="h-4 w-20" />
             <Skeleton className="h-4 w-20" />
         </div>
         <Skeleton className="h-10 w-24 rounded" />
      </div>

      {/* Landing Hero Skeleton */}
      <div className="container mx-auto px-6 lg:px-24 mb-24">
         <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 w-full">
                <Skeleton className="h-16 w-3/4 mb-6" /> {/* Title */}
                <Skeleton className="h-6 w-1/2 mb-2" /> {/* Subtitle */}
                <Skeleton className="h-6 w-1/3 mb-8" />
                <Skeleton className="h-12 w-48 rounded" /> {/* Button */}
            </div>
            <div className="flex-1 w-full flex justify-center">
                 <Skeleton className="w-[400px] h-[400px] rounded-lg" />
            </div>
         </div>
      </div>

       {/* Features Skeleton */}
       <div className="container mx-auto px-6 lg:px-24 mb-24">
            <Skeleton className="h-8 w-64 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex flex-col items-center text-center">
                        <Skeleton className="h-16 w-16 mb-4 rounded-full" />
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                ))}
            </div>
       </div>
    </div>
  );
}
