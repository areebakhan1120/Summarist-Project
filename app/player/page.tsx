"use client";

import AudioPlayer from "../Components/Audioplayer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFontSize } from "../context/FontSizeContext";
import Skeleton from "../Components/ui/Skeleton";

interface PlayerProps {
  bookId: string;
}

export default function Player({ bookId }: PlayerProps) {
  const { fontSize } = useFontSize();
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [coverUrl, setCoverUrl] = useState<string>("");

  useEffect(() => {
    if (!bookId) {
      setLoading(false);
      return;
    }

    const fetchSummary = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
        );

        setSummary(data.summary || "No summary available");
        setTitle(data.title || "");
        setAudioUrl(data.audioLink || "");
        setAuthor(data.author || "");
        setCoverUrl(data.imageLink || "");
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [bookId]);

  return (
    <div className="relative w-full overflow-y-auto h-[calc(100vh-160px)]">
      <div className="whitespace-pre-line p-6 max-w-3xl mx-auto mb-24">
        {loading ? (
            <div className="w-full">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        ) : (
            <>
                <div className="text-[#032b41] text-2xl font-semibold border-b border-[#e1e7ea] mb-8 pb-4 leading-relaxed">
                {title}
                </div>

                <div
                className={`whitespace-pre-line leading-[1.4] text-[#032b41] ${fontSize}`}
                >
                {error && <p className="text-red-500">{error}</p>}
                {!error && summary && <p>{summary}</p>}
                </div>
            </>
        )}
      </div>
      {audioUrl && (
        <AudioPlayer
          src={audioUrl}
          title={title}
          author={author}
          cover={coverUrl}
        />
      )}
    </div>
  );
}