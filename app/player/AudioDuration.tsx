"use client";

import { useEffect, useState } from "react";

interface AudioDurationProps {
  audioLink?: string;
  className?: string; // optional styling
}

export default function AudioDuration({ audioLink, className }: AudioDurationProps) {
  const [duration, setDuration] = useState<string>("");

  useEffect(() => {
    if (!audioLink) return;

    const audio = new Audio(audioLink);

    const handleLoaded = () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60)
        .toString()
        .padStart(2, "0");
      setDuration(`${minutes}:${seconds}`);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);

    // cleanup
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [audioLink]);

  if (!audioLink) return null;

  return <span className={className}>{duration}</span>;
}
