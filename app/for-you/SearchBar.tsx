"use client";

import { useState, useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const [recommended, suggested] = await Promise.all([
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
          ).then((res) => res.json()),
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
          ).then((res) => res.json()),
        ]);
        // Combine and dedup by ID just in case
        const allBooks = [...recommended, ...suggested];
        // optional: deduplication logic if needed, but usually APIs don't overlap much here or it's fine
        setBooks(allBooks);
      } catch (error) {
        console.error("Failed to fetch books for search:", error);
      }
    }
    fetchBooks();

    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 0) {
      const matches = books
        .filter((b) =>
          b.title.toLowerCase().includes(val.toLowerCase()) || 
          b.author.toLowerCase().includes(val.toLowerCase())
        )
        .slice(0, 5); // Limit result count
      setFilteredBooks(matches);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const traverseToBook = (id: string) => {
    router.push(`/book/${id}`);
    setQuery("");     // Clear search after nav? Or keep it? Usually clear or close.
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        if (filteredBooks.length > 0) {
            traverseToBook(filteredBooks[0].id);
        }
    }
  };

  return (
   <div className="bg-white border-b border-[#e1e7ea] h-[80px] z-20 relative">
  <div className="relative flex items-center justify-start lg:justify-end max-w-[1070px] mx-auto h-full px-6 lg:px-8">
    <div
      ref={wrapperRef}
      className="flex items-center gap-6 w-full max-w-[400px] sm:max-w-[340px] lg:max-w-[400px]"
    >
      <div className="flex items-center w-full">
        <div className="relative flex items-center gap-2 w-full">
          <input
            type="text"
            placeholder="Search for books"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length > 0 && setShowDropdown(true)}
            className="h-10 w-full px-4 pr-12 py-0 outline-none bg-[#f1f6f4] text-[#042330] border-2 border-[#e1e7ea] rounded-md transition-all duration-200 focus:border-[#2bd97c]"
          />
          <button
            onClick={() =>
              filteredBooks.length > 0 && traverseToBook(filteredBooks[0].id)
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-full pl-2 cursor-pointer hover:text-[#2bd97c] transition-colors"
          >
            <AiOutlineSearch size={18} />
          </button>
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showDropdown && filteredBooks.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg border border-gray-100 rounded-b-md overflow-hidden z-50 mt-2">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => traverseToBook(book.id)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-none"
                >
                  <figure className="w-10 h-10 min-w-[40px]">
                    {book.imageLink && (
                        <img 
                            src={book.imageLink} 
                            alt={book.title} 
                            className="w-full h-full object-cover rounded" 
                        />
                    )}
                  </figure>
                  <div className="flex flex-col overflow-hidden">
                    <div className="text-sm font-semibold text-[#032b41] truncate">
                      {book.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {book.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
