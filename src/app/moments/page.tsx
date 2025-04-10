"use client";

import { useEffect, useState } from "react";
import { TextField, CircularProgress, Container } from "@mui/material";
import PhotoCarousel from "../../components/PhotoCarousel/PhotoCarousel";
import { useRouter } from "next/navigation";

type StoredImage = {
  url: string;
  timestamp: number;
};
export default function MomentsPage() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("image-history");
    if (stored) {
      const parsed: StoredImage[] = JSON.parse(stored);
      const now = Date.now();
      const validImages = parsed.filter((img) => now - img.timestamp < 60 * 60 * 1000); // 1 hora
      setImages(validImages.map((img) => img.url));
    }
  }, []);

  useEffect(() => {
    const now = Date.now();
    const storedImages: StoredImage[] = images.map((url) => ({ url, timestamp: now }));
    localStorage.setItem("image-history", JSON.stringify(storedImages));
  }, [images]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.image_url) {
        setImages((prev) => [data.image_url, ...prev]);
      } else {
        alert("Erro ao gerar imagem: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar imagem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="min-h-[88vh] mt-32 py-10 px-4 bg-background flex flex-col items-center font-sans animate-fade-in-up">
      <div className="flex flex-col w-full items-start ">
        <span className="bg-gradient-to-r from-[#e73366] to-[#bd8935] bg-clip-text text-transparent font-semibold text-3xl">Oi, meu amor.</span>
        <span className="text-[#D991A5] mb-6 text-center font-semibold text-base">Imagine um momento só nosso:</span>
      </div>

      <TextField
        fullWidth
        multiline
        minRows={4}
        label="Descreva a cena"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        variant="outlined"
        className="mb-6"
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
            color: "#c37e0f",
            borderRadius: 2,

            "& fieldset": {
              borderColor: "#D991A5", // borda padrão (rosa queimado)
            },
            "&:hover fieldset": {
              borderColor: "#C9B28E", // dourado no hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#C9B28E", // dourado quando ativo
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#D991A5", // cor do label
          },
          "& label.Mui-focused": {
            color: "#C9B28E", // label quando focado
          },
        }}
      />

      <div className="w-full flex gap-3">
        <button
          onClick={() => router.push("/")}
          className="mt-3 w-full bg-[#D991A5] cursor-pointer hover:bg-accent text-white px-6 py-2 rounded-lg font-semibold text-xl transition-all duration-300"
          style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
        >
          Voltar
        </button>
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="w-full mt-3 bg-[#D991A5] cursor-pointer hover:bg-accent text-white px-6 py-2 rounded-lg font-semibold text-xl transition-all duration-300"
          style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Gerar"}
        </button>
      </div>

      <span>ooo</span>
      <PhotoCarousel extraImages={images} />
      {images.length > 0 && (
        <>
          <span className="text-[#D991A5] mb-6 text-center font-semibold text-3xl">Nossos momentos hoje</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {images.map((img, idx) => (
              <img key={idx} src={img} alt={`Imagem ${idx + 1}`} className="rounded shadow w-full" />
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
