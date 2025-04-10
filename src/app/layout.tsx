import type { Metadata } from "next";
import "./globals.css";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import { MusicProvider } from "@/contexts/MusicContext";
import { Analytics } from "@vercel/analytics/react";
export const metadata: Metadata = {
  title: "Refuge from Your Absence",
  description: "love u",
  icons: {
    icon: "./heart.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Analytics />
        <MusicProvider>
          <AudioPlayer />
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}
