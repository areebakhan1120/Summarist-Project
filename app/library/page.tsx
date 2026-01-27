"use client";

import Skeleton from "@/app/Components/ui/Skeleton";
import { useLibrary } from "@/app/Components/LibraryContext";
import Link from "next/link";
import { CiClock2, CiStar } from "react-icons/ci";

export default function LibraryPage() {
  const { library, loading } = useLibrary();

  if (loading)
    return (
      <div className="max-w-[1070px] w-full mx-auto px-6">
        <div className="py-10 w-full">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32 mb-6" />

          <div className="flex flex-wrap gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="relative pt-8 px-3 pb-3 rounded max-w-[200px] w-full">
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

  return (
    <div className="max-w-[1070px] w-full mx-auto px-6">
      <div className="py-10 w-full">
        {/* Title */}
        <h1 className="text-[32px] font-bold text-[#032b41] mb-2">
          Saved Books
        </h1>

        {/* Subtitle */}
        {library.length > 0 && (
          <p className="text-[#394547] font-light mb-6">
            {library.length} item{library.length > 1 ? "s" : ""} in your library.
          </p>
        )}

        {/* Empty state */}
        {library.length === 0 && (
          <p className="text-[#394547] font-light mt-6">
            You haven’t saved any books yet.
          </p>
        )}

        {/* Books grid */}
        <div className="flex flex-wrap gap-4">
          {library.map((book) => (
            <Link
              key={book.id}
              href={`/book/${book.id}`}
              className="relative pt-8 px-3 pb-3 no-underline rounded max-w-[200px] w-full cursor-pointer"
            >
              <figure className="w-[172px] h-[172px] mb-2">
                {book.imageLink && (
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </figure>

              <div className="text-[16px] font-bold text-[#032b41] mb-1">
                {book.title}
              </div>

              <div className="text-[14px] text-[#6b757b] font-light mb-2">
                {book.author}
              </div>

              <div className="flex gap-2">
                <div className="flex items-center gap-1 text-[14px] text-[#6b757b]">
                  <CiClock2 />
                </div>

                <div className="flex items-center gap-1 text-[14px] text-[#6b757b]">
                  <CiStar />  
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
