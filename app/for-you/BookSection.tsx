"use client";

import { CiClock2, CiStar } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useAuth } from "../Auth/AuthContext";
import { useEffect, useState, useRef } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import AudioDuration from "../player/AudioDuration";
import Skeleton from "../Components/ui/Skeleton";

interface Book {
  id: string;
  title: string;
  author: string;
  subTitle?: string;
  imageLink?: string;
  duration?: string;
  averageRating?: string;
  subscriptionRequired: boolean;
  audioLink?: string;
}

interface BooksSectionProps {
  title: string;
  subTitle?: string;
  apiUrl: string;
}

export default function BooksSection({ title, subTitle, apiUrl }: BooksSectionProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isLoggedIn, subscriptionType } = useAuth();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(apiUrl, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [apiUrl]);

  const handleBookClick = (book: Book) => {
    if (!isLoggedIn) {
      router.push(
        `/Auth/AuthModal?bookId=${book.id}&title=${encodeURIComponent(book.title)}`
      );
      return;
    }
    router.push(`/book/${book.id}`);
  };

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const distance = Math.round(el.clientWidth * 0.75) || 300;
    el.scrollBy({ left: direction === "left" ? -distance : distance, behavior: "smooth" });
  };

  return (
    <div className="max-w-[1070px] w-full mx-auto px-6">
      <div className="py-10 w-full">
        <div className="block">
          <div className="text-[22px] font-bold text-[#032b41] mb-4">{title}</div>
          {subTitle && <div className="font-light text-[#394547] mb-4">{subTitle}</div>}

          <div className="relative -mx-6 md:-mx-16 mb-8 overflow-visible">
            {/* LEFT ARROW */}
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-black/60 backdrop-blur p-2 rounded-full hover:bg-black transition flex"
            >
              <TbChevronLeft className="text-white" size={20} />
            </button>

            {/* CAROUSEL */}
            <div
              ref={carouselRef}
              className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth max-w-[1070px] mx-auto px-6"
            >
              {loading ? (
                 [...Array(5)].map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[200px] mb-8">
                        <Skeleton className="h-[240px] w-full rounded-md mb-2 bg-gray-200" />
                        <Skeleton className="h-4 w-3/4 mb-1 bg-gray-200" />
                        <Skeleton className="h-3 w-1/2 bg-gray-200" />
                    </div>
                ))
              ) : (
                books.map((book) => {
                const isPremiumBook = book.subscriptionRequired;
                const canAccess =
                  !isPremiumBook || subscriptionType === "premium" || subscriptionType === "premium-plus";

                return (
                  <div
                    key={book.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => canAccess && handleBookClick(book)}
                    onKeyDown={(e) => {
                      if ((e.key === "Enter" || e.key === " ") && canAccess)
                        handleBookClick(book);
                    }}
                    className={`relative snap-start px-3 pb-3 pt-8 rounded flex-shrink-0
                      w-[260px] sm:w-[240px] md:w-[200px]
                      transition-all duration-200
                      ${canAccess
                        ? "cursor-pointer hover:shadow-lg hover:bg-gray-100"
                        : "opacity-60 cursor-not-allowed pointer-events-none"
                      }`}
                  >
                    {/* Premium Pill */}
                    {isPremiumBook && subscriptionType === "basic" && (
                      <div className="absolute -top-0.5 -right-3 bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-full z-20 pointer-events-none">
                        Premium
                      </div>
                    )}

                    {/* Book Image */}
                    <figure className="relative w-[172px] h-[172px] mb-3 mx-auto md:mx-0">
                      {book.imageLink && (
                        <img
                          src={book.imageLink}
                          alt={book.title}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                    </figure>

                    {/* Book Info */}
                    <div className="text-[16px] font-bold text-[#032b41] mb-2">{book.title}</div>
                    <div className="text-[14px] text-[#6b757b] font-light mb-2">{book.author}</div>
                    <div className="text-[14px] text-[#394547] mb-2 line-clamp-2">{book.subTitle}</div>

                    {/* Audio & Rating */}
                    <div className="flex gap-2">
                      {book.audioLink && (
                        <div className="flex items-center gap-1 text-[14px] font-light text-[#6b757b]">
                          <AudioDuration
                            audioLink={book.audioLink}
                            className="ml-2 text-gray-500 text-[14px]"
                          />
                        </div>
                      )}
                      {book.averageRating && (
                        <div className="flex items-center gap-1 text-[14px] font-light text-[#6b757b]">
                          <CiStar className="w-4 h-4" />
                          <span>{book.averageRating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            </div>

            {/* RIGHT ARROW */}
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-black/60 backdrop-blur p-2 rounded-full hover:bg-black transition flex"
            >
              <TbChevronRight className="text-white" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
