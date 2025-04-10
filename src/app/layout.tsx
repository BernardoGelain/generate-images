import type { Metadata } from "next";
import "./globals.css";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import { MusicProvider } from "@/contexts/MusicContext";

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
        <MusicProvider>
          <AudioPlayer />
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}
