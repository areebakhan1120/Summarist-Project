import Skeleton from "../../Components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="row">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Summary Skeleton */}
          <div className="flex-1">
            <Skeleton className="h-10 w-3/4 mb-4" /> {/* Title */}
            <Skeleton className="h-6 w-1/2 mb-6" /> {/* Author */}
            <Skeleton className="h-20 w-full mb-6" /> {/* Subtitle/Idea */}
            
            <div className="border-t border-b py-4 mb-6 flex gap-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
            </div>

             <div className="flex gap-4 mb-8">
                <Skeleton className="h-12 w-40 rounded" /> {/* Read Button */}
                <Skeleton className="h-12 w-40 rounded" /> {/* Listen Button */}
            </div>

             <Skeleton className="h-10 w-48 mb-4" /> {/* Badge? */}
             <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
             </div>
          </div>

          {/* Book Cover Skeleton */}
          <div className="flex justify-center md:justify-end">
             <Skeleton className="w-[300px] h-[450px] rounded-md shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
