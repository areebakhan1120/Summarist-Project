"use client";

import { CiBookmark, CiClock2, CiStar } from "react-icons/ci";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuBookOpenText } from "react-icons/lu";
import { SlMicrophone } from "react-icons/sl";
import { useLibrary } from "@/app/Components/LibraryContext";
import { useAuth } from "../Auth/AuthContext";
import { useState } from "react";
import Modal from "../Components/Modal";
import { useRouter } from "next/navigation";
import AudioDuration from "../player/AudioDuration";

interface Book {
  id: string;
  title: string;
  author: string;
  subTitle?: string;
  bookDescription?: string;
  imageLink?: string;
  averageRating?: string;
  totalRating?: string;
  duration?: string;
  type?: string;
  keyIdeas?: string;
  tags?: string[];
  authorDescription?: string;
  audioLink?: string;
}

export default function BookDetails({ book }: { book: Book }) {
  const { addToLibrary, isInLibrary } = useLibrary();
  const { login, isLoggedIn } = useAuth();
  const saved = isInLibrary(book.id);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    await login();
    setOpen(false);
  };

  return (
    <div className="relative flex flex-col lg:flex-row-reverse gap-6 px-4 lg:px-6 xl:px-8 pt-6 lg:ml-[200px]">
      {/* Book Image */}
      {book.imageLink && (
        <div className="flex-shrink-0 w-full sm:w-3/4 md:w-1/2 lg:w-5/12 xl:w-1/3">
          <figure>
            <img
              src={book.imageLink}
              alt={book.title}
              className="w-full h-auto rounded object-cover"
            />
          </figure>
        </div>
      )}

      {/* Book Content */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Title & Author */}
        <h1 className="text-[#032b41] font-semibold text-2xl sm:text-3xl break-words">
          {book.title}
        </h1>
        {isLoggedIn && (
          <>
            <h2 className="text-[#032b41] font-medium text-lg sm:text-xl break-words">
              {book.author}
            </h2>
            {book.subTitle && (
              <p className="text-[#032b41] text-base sm:text-lg font-light break-words">
                {book.subTitle}
              </p>
            )}
          </>
        )}

        {/* Stats */}
        {isLoggedIn && (
          <div className="border-y border-[#e1e7ea] py-4 mb-6 flex flex-wrap gap-4">
            <div className="flex items-center w-1/2 sm:w-1/4 text-[#032b41] font-medium text-sm sm:text-base">
              <CiStar className="h-5 w-5 mr-1" /> {book.averageRating} ({book.totalRating})
            </div>
            <div className="flex items-center w-1/2 sm:w-1/4 text-[#032b41] font-medium text-sm sm:text-base">
              <CiClock2 className="h-5 w-5 mr-1" />                         {book.audioLink && <AudioDuration audioLink={book.audioLink} className="ml-2 text-gray-500 text-[14px]" />}
            </div>
            <div className="flex items-center w-1/2 sm:w-1/4 text-[#032b41] font-medium text-sm sm:text-base">
              <SlMicrophone className="h-5 w-5 mr-1" /> {book.type}
            </div>
            <div className="flex items-center w-1/2 sm:w-1/4 text-[#032b41] font-medium text-sm sm:text-base">
              <HiOutlineLightBulb className="h-5 w-5 mr-1" /> {book.keyIdeas} Key ideas
            </div>
          </div>
        )}

        {/* Login Prompt */}
        {!isLoggedIn ? (
          <div className="flex flex-col gap-4 items-center justify-center py-6">
            <img
              src="/login.png"
              alt="Login to read"
              className="w-full max-w-[500px] h-auto rounded"
            />
            <div className="text-[#032b41] font-semibold text-2xl sm:text-3xl text-center">
              Log in to your account to read and listen to the book
            </div>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center justify-center h-10 w-64 bg-[#2bd97c] text-[#032b41] text-base font-medium rounded transition-colors hover:bg-[#20ba68]"
            >
              Login
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)} onSubmit={handleLogin} />
          </div>
        ) : (
          <>
            {/* Read/Listen Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => router.push(`/player/${book.id}`)}
                className="flex items-center justify-center w-36 h-12 bg-[#032b41] text-white text-base rounded-sm gap-2 transition-opacity duration-200"
              >
                <LuBookOpenText className="h-6 w-6" />
                Read
              </button>
              <button 
              onClick={() => router.push(`/player/${book.id}`)}
              className="flex items-center justify-center w-36 h-12 bg-[#032b41] text-white text-base rounded-sm gap-2 transition-opacity duration-200">
                <SlMicrophone className="h-6 w-6" />
                Listen
              </button>
            </div>

            {/* Add to Library */}
            <div
              onClick={() => {
                if (!saved) {
                  addToLibrary({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    imageLink: book.imageLink,
                  });
                }
              }}
              className={`flex items-center gap-2 mb-6 text-base font-medium cursor-pointer transition-colors duration-200 ${
                saved
                  ? "text-green-600 cursor-default"
                  : "text-[#0365f2] hover:text-blue-700"
              }`}
            >
              <CiBookmark className={`h-6 w-6 ${saved ? "text-green-600" : "text-[#0365f2]"}`} />
              {saved ? "Saved to My Library" : "Add title to My Library"}
            </div>

            {/* Book Description */}
            <div className="text-base sm:text-lg text-[#032b41] mb-4 leading-relaxed">
              {book.bookDescription}
            </div>

            {/* About the Author */}
            <h2 className="text-base sm:text-lg font-semibold text-[#032b41] mb-4">
              About the Author
            </h2>
            <div className="text-base sm:text-lg text-[#032b41] leading-relaxed">
              {book.authorDescription}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {book.tags?.map((tag) => (
                <div
                  key={tag}
                  className="bg-[#f1f6f4] px-3 h-10 flex items-center text-[#032b41] font-medium rounded-sm"
                >
                  {tag}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
