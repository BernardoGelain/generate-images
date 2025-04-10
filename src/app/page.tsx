"use client";

import { useMusic } from "@/contexts/MusicContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const verses = [
  [
    "A dor constante de tua ausência é meu estigma",
    "Então fecho meus olhos para te encontrar",
    "Ao sentir teu calor, torno ao enigma",
    "Quando a saudade parará de me golpear?",
  ],
  ["Ajoelho-me nos portões da imaginação", "Esforço-me de todo espiríto para nos vislumbrar", "Sequer sinto seu perfume", "Sequer posso te beijar"],
  ["Tua falta me oprime", "Mas agora posso nos ver", "Embora ainda não tenha feito-te minha", "Encontrei uma forma de continuar a viver"],
];

export default function HomePage() {
  const [visibleCount, setVisibleCount] = useState(0);
  const router = useRouter();
  const { started: poemStarted } = useMusic();
  useEffect(() => {
    if (!poemStarted) return;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < verses.flat().length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [poemStarted]);

  return (
    <div className="w-full h-[90vh] flex flex-col gap-5 justify-center items-center sm:pl-15 pl-2">
      <div className="flex flex-col w-full sm:w-[60%] gap-5 h-[80%] justify-center">
        {verses.map((estrofe, i) => (
          <div key={i} className="flex flex-col justify-start items-start">
            {estrofe.map((verso, j) => {
              const index = i * 4 + j;
              const isVisible = visibleCount > index;
              return (
                <span
                  key={j}
                  className={`italic text-[#D991A5] text-lg sm:text-2xl transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                  {verso}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      {visibleCount >= verses.flat().length && (
        <div className=" flex justify-center animate-fade-in-up">
          <button
            onClick={() => router.push("/moments")}
            className="w-full mt-3 bg-[#D991A5] cursor-pointer hover:bg-accent text-white px-6 py-2 rounded-lg font-semibold text-xl transition-all duration-300"
            style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
          >
            Imaginar nossos momentos 💫
          </button>
        </div>
      )}
    </div>
  );
}
