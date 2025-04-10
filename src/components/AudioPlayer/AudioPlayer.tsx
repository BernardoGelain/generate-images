"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Play, Pause, Disc3 } from "lucide-react";
import { useMusic } from "@/contexts/MusicContext";

export default function AudioPlayer() {
  const { setStarted, started } = useMusic();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const pathname = usePathname();

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      setStarted(true);
    }

    setIsPlaying(!isPlaying);
  };

  const isHomeAndPaused = pathname === "/" && !isPlaying && !started;

  return (
    <div
      className={`w-full z-50 ${
        isHomeAndPaused
          ? "fixed inset-0 flex items-center justify-center animate-fade-in-up"
          : "animate-fade-in-up absolute top-5 flex justify-center"
      }`}
    >
      <div className="flex w-[300px] items-center justify-between p-4 bg-white/20 rounded-xl shadow-md">
        <div className="flex justify-center items-center gap-2 w-[50%]">
          <button onClick={togglePlayback} className="bg-primary py-2 text-white rounded-full hover:bg-accent transition self-start mb-1">
            {isPlaying ? <Pause size={20} color="#d991a5" /> : <Play size={20} color="#d991a5" />}
          </button>
          <span className="text-[#d991a5] font-bold text-sm">How to fight loneliness?</span>
        </div>
        <div className={`w-16 h-16 rounded-full overflow-hidden ${isPlaying ? "animate-spin-slow" : ""}`}>
          <audio ref={audioRef} src="/audio/how-to-fight-loneliness.mp3" preload="auto" />
          <Disc3 color="#d991a5" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
