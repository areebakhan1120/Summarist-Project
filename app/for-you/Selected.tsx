"use client";

import { IoMdPlayCircle } from "react-icons/io";

import { useRouter } from "next/navigation";
import { useAuth } from "../Auth/AuthContext";
import AudioDuration from "../player/AudioDuration";

interface Book {
  id: string;
  title: string;
  author: string;
  subTitle?: string;
  imageLink?: string;
  audioLink?: string;
  totalRating?: number;
  averageRating?: number;
  keyIdeas?: number;
  type?: string;
  status?: string;
  subscriptionRequired?: boolean;
  summary?: string;
  tags?: string[];
  bookDescription?: string;
  authorDescription?: string;
}

interface SelectedProps {
  books: Book[];
}

export default function Selected({ books }: SelectedProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleBookClick = (book: Book) => {
    if (!isLoggedIn) {
      router.push(
        `/Auth/AuthModal?bookId=${book.id}&title=${encodeURIComponent(
          book.title
        )}`
      );
      return;
    }
    router.push(`/book/${book.id}`);
  };

  return (
    <div className="max-w-[1070px] w-full mx-auto px-4 sm:px-6">
      <div className="py-8 w-full">
          <div className="text-[22px] font-bold text-[#032b41] mb-4 text-center md:text-left">
            Selected just for you
          </div>

          {books.map((book: Book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className="flex flex-col md:flex-row w-full lg:max-w-[70%] mx-auto bg-[#fbefd6] rounded p-6 gap-6 cursor-pointer hover:bg-[#f7dfb0] transition-colors duration-200 items-center md:items-stretch"
            >
              {/* Subtitle Section */}
              <div className="w-full md:w-2/5 flex flex-col justify-center text-center md:text-left order-1">
                <div className="text-[#032b41] line-clamp-2 md:line-clamp-none font-medium">
                  {book.subTitle || book.summary}
                </div>
              </div>

              {/* Vertical Divider (Hidden on mobile) */}
              <div className="hidden md:block w-px bg-[#bac8ce] flex-shrink-0 order-2"></div>

              {/* Image & Details Section */}
              <div className="w-full md:w-3/5 flex flex-col sm:flex-row gap-6 items-center sm:items-start order-3">
                {/* Image */}
                <figure className="h-[140px] w-[140px] flex-shrink-0">
                  {book.imageLink && (
                    <img
                      src={book.imageLink}
                      alt={book.title}
                      className="h-full w-full object-cover rounded shadow-sm"
                    />
                  )}
                </figure>

                {/* Details */}
                <div className="w-full text-center sm:text-left flex flex-col justify-center">
                  <div className="font-semibold text-[#032b41] mb-2 text-lg">
                    {book.title}
                  </div>
                  <div className="text-[14px] text-[#394547] mb-4">
                    {book.author}
                  </div>
                  
                  {/* Player / Action */}
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/player/${book.id}`);
                      }}
                      className="hover:scale-110 transition-transform flex-shrink-0"
                    >
                      <IoMdPlayCircle size={40} className="text-[#032b41]" />
                    </button>
                    
                    <div className="text-[14px] font-medium text-[#032b41]">
                      {book.audioLink ? "Listen Now" : "Read Now"}
                      {book.audioLink && (
                        <AudioDuration
                          audioLink={book.audioLink}
                          className="ml-2 text-gray-500 text-[12px]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
