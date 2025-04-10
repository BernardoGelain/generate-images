"use client";

import { createContext, useContext, useState } from "react";

type MusicContextType = {
  started: boolean;
  setStarted: (value: boolean) => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);

  return <MusicContext.Provider value={{ started, setStarted }}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used within MusicProvider");
  return context;
}
