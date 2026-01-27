"use client";

import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdReplay10, MdForward10 } from "react-icons/md";
import Image from "next/image";

type AudioPlayerProps = {
  src: string;
  title: string;
  author: string;
  cover: string;
};

export default function AudioPlayer({
  src,
  title,
  author,
  cover,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      Math.max(0, audioRef.current.currentTime + seconds),
      duration
    );
    setProgress(audioRef.current.currentTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Update duration on metadata load
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setProgress(audio.currentTime);
    };
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    return () =>
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
  }, []);

  // Update progress while playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setProgress(audio.currentTime);
    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] bg-[#042330] px-4 py-2 sm:px-6 sm:py-3">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

        {/* Left - Cover & Info */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {cover && (
            <Image
              src={cover}
              alt={title}
              width={48}
              height={48}
              className="rounded flex-shrink-0"
            />
          )}
          <div className="flex flex-col min-w-0 text-white overflow-hidden">
            <span className="font-semibold text-sm sm:text-base truncate">{title}</span>
            <span className="text-xs sm:text-sm text-gray-300 truncate">{author}</span>
          </div>
        </div>

        {/* Middle - Controls */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 my-1 sm:my-0">
          <button
            className="text-white p-1 sm:p-2 rounded-full"
            onClick={() => skip(-10)}
          >
            <MdReplay10 className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={togglePlay}
            className="bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
          >
            {playing ? <FaPause /> : <FaPlay />}
          </button>

          <button
            className="text-white p-1 sm:p-2 rounded-full"
            onClick={() => skip(10)}
          >
            <MdForward10 className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>

        {/* Right - Progress */}
        <div className="flex flex-col sm:flex-1 gap-1 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full">
            <span className="text-white text-xs sm:text-sm">{formatTime(progress)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={(e) => {
                const newTime = Number(e.target.value);
                if (audioRef.current) audioRef.current.currentTime = newTime;
                setProgress(newTime);
              }}
              className="w-full rounded-[8px] h-1 cursor-pointer appearance-none"
              style={{
                background: `linear-gradient(to right, #2bd97c ${progressPercent}%, #6d787d ${progressPercent}%)`,
              }}
            />
            <span className="text-white text-xs sm:text-sm">{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Custom slider thumb */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          margin-top: -6px;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
