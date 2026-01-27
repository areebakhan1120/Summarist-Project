
"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink?: string;
}

interface LibraryContextType {
  library: Book[];
  addToLibrary: (book: Book) => void;
  removeFromLibrary: (id: string) => void;
  isInLibrary: (id: string) => boolean;
  loading: boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [library, setLibrary] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const isInLibrary = (id: string) => library.some((book) => book.id === id);

  // Load saved books on first render
  useEffect(() => {
    const stored = localStorage.getItem("library");
    if (stored) {
      setLibrary(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(library));
  }, [library]);

  const addToLibrary = (book: Book) => {
    setLibrary((prev) =>
      prev.some((b) => b.id === book.id) ? prev : [...prev, book]
    );
  };

  const removeFromLibrary = (id: string) => {
    setLibrary((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <LibraryContext.Provider
      value={{ library, addToLibrary, removeFromLibrary, isInLibrary, loading }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used inside LibraryProvider");
  }
  return context;
}
