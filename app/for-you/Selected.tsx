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
    <div className="max-w-[1070px] w-full mx-auto px-6">
      <div className="py-10 w-full">
        <div className="wrapper">
          <div className="text-[22px] font-bold text-[#032b41] mb-4">
            Selected just for you
          </div>

          {books.map((book: Book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className="flex justify-between w-full mx-auto sm:w-[95%] md:w-[85%] lg:w-[calc((100%/3)*2)] bg-[#fbefd6] rounded p-6 mb-6 gap-6 cursor-pointer transition-all duration-200 hover:bg-[#f7dfb0] flex-col sm:flex-row"
            >
              <div className="text-[#032b41] w-full sm:w-2/5">
                <div
                  className="line-clamp-2"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {book.subTitle}
                </div>
              </div>
              <div className="hidden sm:block w-px bg-[#bac8ce]"></div>
              <div className="flex gap-4 w-full sm:w-3/5">
                <figure className="h-[140px] w-[140px] min-w-[140px]">
                  {book.imageLink && (
                    <img
                      src={book.imageLink}
                      alt={book.title}
                      className="h-full w-full object-cover rounded"
                    />
                  )}
                </figure>
                <div className="w-full">
                  <div className="font-semibold text-[#032b41] mb-2">
                    {book.title}
                  </div>
                  <div className="text-[14px] text-[#394547] mb-4">
                    {book.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center w-[40px] min-w-[40px] h-[40px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/player/${book.id}`);
                        }}
                      >
                        <IoMdPlayCircle size={30} />
                      </button>
                    </div>
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
    </div>
  );
}
