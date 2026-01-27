"use client";

import { useParams, useSearchParams } from "next/navigation";
import Player from "../page";

export default function PlayerPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const bookId = (params && (params as any).bookId) || searchParams.get("bookId") || "";
  const title = searchParams.get("title") || "Book Summary";

  return <Player bookId={bookId} />;
}